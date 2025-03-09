/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dayjs from 'dayjs';
import * as qs from 'qs';
import * as crypto from 'crypto';
import { EEnv } from 'src/common/constants/env.enum';
import { sortObject } from 'src/common/utils/sortObject';
import { CreatePaymentTransactionOrderDto } from './dto/create-payment-transaction-order.dto';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class PaymentTransactionService {
  constructor(
    private readonly configService: ConfigService,
    private readonly orderService: OrdersService,
  ) {}

  private generateOrderId(): string {
    return dayjs().format('HHmmss');
  }

  private generateCreateDate(): string {
    return dayjs().format('YYYYMMDDHHmmss');
  }

  async create(args: {
    ipAddress: string;
    totalPrice: number;
    orderInfo: string;
  }): Promise<string> {
    try {
      const { ipAddress, totalPrice, orderInfo } = args;

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

      const createDate = this.generateCreateDate();
      const orderId = this.generateOrderId();

      let vnp_Params: Record<string, any> = {
        vnp_Version: version,
        vnp_Command: 'pay',
        vnp_TmnCode: tmnCode,
        vnp_Locale: 'vn',
        vnp_CurrCode: 'VND',
        vnp_TxnRef: orderId,
        vnp_OrderInfo: orderInfo,
        vnp_OrderType: 'other',
        vnp_Amount: totalPrice * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddress,
        vnp_CreateDate: createDate,
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

  async verifyAndCreateOrder(
    args: CreatePaymentTransactionOrderDto & {
      userId: number;
      userEmail: string;
    },
  ) {
    const { query, ...createOrderDto } = args;
    const result = await this.verify(query);

    if (result) {
      return this.orderService.create({ ...createOrderDto, ...result });
    }

    return {
      msg: 'Payment failed!',
      data: null,
    };
  }

  async verify(args?: any) {
    const secretKey = this.configService.get(EEnv.SECRET_KEY);

    const receivedHash = args.vnp_SecureHash;
    delete args.vnp_SecureHash;

    const sortedParams = Object.keys(args)
      .sort()
      .reduce((acc, key) => ({ ...acc, [key]: args[key] }), {});

    const queryString = new URLSearchParams(sortedParams).toString();
    const hmac = crypto.createHmac('sha512', secretKey);
    const expectedHash = hmac
      .update(Buffer.from(queryString, 'utf-8'))
      .digest('hex');

    if (expectedHash !== receivedHash) {
      throw new BadRequestException(
        'Invalid secure hash, possible tampering detected!',
      );
    }

    if (args.vnp_ResponseCode !== '00') {
      throw new BadRequestException('Payment failed!');
    }

    return {
      bank: args?.vnp_BankCode,
      cardType: args?.vnp_CardType,
      transactionId: args?.vnp_TransactionNo,
    };
  }
}
