import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import * as dayjs from 'dayjs';
import * as qs from 'qs';
import { EEnv } from 'src/common/constants/env.enum';
import { EOrderStatus, EPaymentStatus } from 'src/common/constants/order.enum';
import {
  EVnpayResponseCode,
  EVnpayTransactionNo,
  EVnpayTransactionStatus,
  VNPAY_RESPONSE,
  VnpayResponseCodeDescription,
} from 'src/common/constants/vnpay.enum';
import { sortObject } from 'src/common/utils/sort-object';
import { Payment } from 'src/database/entities/payment.entity';
import { TypeOrmBaseService } from 'src/database/services/typeorm-base.service';
import { DataSource, In, Repository } from 'typeorm';
import { OrdersService } from '../orders/orders.service';
import { VnpayIpnDto } from './dto/vnpay.dto';
import { ETableName } from 'src/common/constants/table-name.enum';
import { Order } from 'src/database/entities/order.entity';
@Injectable()
export class PaymentsService extends TypeOrmBaseService<Payment> {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
    private readonly dataSource: DataSource,
  ) {
    super(paymentsRepository);
  }

  create() {
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update() {
    return `This action updates a # payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }

  async generateUrl(args: {
    txnRef?: string;
    ipAddress?: string;
    totalPrice: number;
    orderInfo: string;
  }): Promise<string> {
    try {
      const { ipAddress, totalPrice, orderInfo, txnRef } = args;

      if (!totalPrice || totalPrice < 10000)
        throw new BadRequestException('Invalid amount');
      if (!orderInfo) throw new BadRequestException('Missing order details');

      const tmnCode = this.configService.get<string>(EEnv.TMN_CODE);
      const secretKey = this.configService.get<string>(EEnv.SECRET_KEY);
      const returnUrl = this.configService.get<string>(EEnv.CALLBACK_URL);
      const vnpUrl = this.configService.get<string>(EEnv.PAYMENT_GATEWAY_URL);
      const version = this.configService.get<string>(
        EEnv.PAYMENT_GATEWAY_VERSION,
      );

      if (!tmnCode || !secretKey || !returnUrl || !vnpUrl) {
        throw new Error('Missing VNPAY configuration');
      }

      let vnp_Params: Record<string, any> = {
        vnp_Version: version,
        vnp_Command: 'pay',
        vnp_TmnCode: tmnCode,
        vnp_Locale: 'vn',
        vnp_CurrCode: 'VND',
        vnp_TxnRef: txnRef,
        vnp_OrderInfo: orderInfo,
        vnp_OrderType: 'other',
        vnp_Amount: totalPrice * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddress,
        vnp_CreateDate: dayjs().format('YYYYMMDDHHmmss'),
      };

      vnp_Params = sortObject(vnp_Params) as any;

      const signData = qs.stringify(vnp_Params, { encode: false });
      const hmac = crypto.createHmac('sha512', secretKey);
      const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
      vnp_Params['vnp_SecureHash'] = signed;

      return `${vnpUrl}?${qs.stringify(vnp_Params, { encode: false })}`;
    } catch (error) {
      throw new Error(`Error generating payment URL: ${error.message}`);
    }
  }

  async processPaymentIpnCallback(
    vnpayIpnDto: VnpayIpnDto,
  ): Promise<{ RspCode: string; Message: string }> {
    const {
      vnp_TransactionStatus,
      vnp_ResponseCode,
      vnp_TransactionNo,
      vnp_BankCode,
      vnp_CardType,
      vnp_TxnRef,
      vnp_PayDate,
      vnp_BankTranNo,
      vnp_Amount,
    } = vnpayIpnDto;

    const isValidChecksum = this.validateVnpayChecksum(vnpayIpnDto);
    if (!isValidChecksum) {
      return VNPAY_RESPONSE.INVALID_CHECKSUM;
    }

    if (!vnp_TxnRef) {
      console.error(`Invalid order ID format: ${vnp_TxnRef}`);
      return VNPAY_RESPONSE.ORDER_NOT_FOUND;
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const order = await queryRunner.manager.findOne(Order, {
        where: { txnRef: vnp_TxnRef, isDeleted: false },
        relations: ['user', 'orderItems'],
      });

      if (!order) {
        console.warn(`Order not found with Ref: ${vnp_TxnRef}`);
        return VNPAY_RESPONSE.ORDER_NOT_FOUND;
      }

      if (order.status !== EOrderStatus.DRAFT) {
        console.info(
          `Order ${vnp_TxnRef} already processed with status: ${order.status}`,
        );
        return VNPAY_RESPONSE.SUCCESS;
      }

      const payment = await queryRunner.manager.findOne(Payment, {
        where: { isDeleted: false, order: { txnRef: vnp_TxnRef } },
        relations: ['order'],
      });

      if (!payment) {
        console.warn(`Order not found with Ref: ${vnp_TxnRef}`);
        return VNPAY_RESPONSE.PAYMENT_NOT_FOUND;
      }

      if (payment.status === EPaymentStatus.COMPLETED) {
        console.warn(`Order not found with Ref: ${vnp_TxnRef}`);
        return VNPAY_RESPONSE.SUCCESS;
      }

      if (
        vnp_TransactionStatus === EVnpayTransactionStatus.SUCCESS &&
        vnp_ResponseCode === EVnpayResponseCode.SUCCESS &&
        vnp_TransactionNo !== EVnpayTransactionNo.FAIL
      ) {
        const vnpAmount = parseInt(vnp_Amount) / 100;
        if (Number(payment.totalPrice) !== vnpAmount) {
          await queryRunner.rollbackTransaction();
          return VNPAY_RESPONSE.INVALID_AMOUNT;
        }

        await queryRunner.manager.update(
          ETableName.CART_ITEM,
          {
            user: { id: order?.user?.id },
            id: In(
              Object.values(order?.cart || {}).map((item: any) => item.id),
            ),
            isDeleted: false,
          },
          { isDeleted: true },
        );

        order.status = EOrderStatus.PENDING;
        payment.status = EPaymentStatus.COMPLETED;
        payment.details = {
          bank: vnp_BankCode,
          transactionID: vnp_TransactionNo,
          cardType: vnp_CardType,
          paidAt: vnp_PayDate,
          bankTransactionNo: vnp_BankTranNo,
          transactionStatus: vnp_TransactionStatus,
          responseCode: vnp_ResponseCode,
          paymentAmount: vnpAmount,
        };
      } else {
        payment.status = EPaymentStatus.FAILED;
        payment.details = {
          transactionStatus: vnp_TransactionStatus,
          responseCode: vnp_ResponseCode,
          failureReason:
            VnpayResponseCodeDescription[vnp_ResponseCode] || 'Unknown error',
        };
      }
      await queryRunner.manager.save(payment);
      await queryRunner.manager.save(order);
      await queryRunner.commitTransaction();
      return VNPAY_RESPONSE.SUCCESS;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error processing payment IPN:', error);
      return VNPAY_RESPONSE.SERVER_ERROR;
    } finally {
      await queryRunner.release();
    }
  }

  private validateVnpayChecksum(vnpayIpnDto: VnpayIpnDto): boolean {
    const receivedHash = vnpayIpnDto.vnp_SecureHash;
    const secretKey = this.configService.get<string>(EEnv.SECRET_KEY);
    const tmnCode = this.configService.get<string>(EEnv.TMN_CODE);

    const dataToHash = { ...vnpayIpnDto };
    delete dataToHash.vnp_SecureHash;

    const sortedParams = Object.keys(dataToHash)
      .sort()
      .reduce((obj, key) => {
        obj[key] = dataToHash[key];
        return obj;
      }, {});

    const queryString = new URLSearchParams(sortedParams).toString();
    const hmac = crypto.createHmac('sha512', secretKey);
    const expectedHash = hmac
      .update(Buffer.from(queryString, 'utf-8'))
      .digest('hex');

    return expectedHash === receivedHash && tmnCode === vnpayIpnDto.vnp_TmnCode;
  }
}
