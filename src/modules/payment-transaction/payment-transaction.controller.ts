import { Body, Controller, Ip, Post, Req } from '@nestjs/common';
import { Request as Rq } from 'express';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { ERole } from 'src/common/constants/role.enum';
import { GetUser, UserParams } from 'src/common/decorators/user.decorator';
import { Permissions } from '../auth/guards/global-auth.guard';
import { CreatePaymentTransactionOrderDto } from './dto/create-payment-transaction-order.dto';
import { CreatePaymentTransactionDto } from './dto/create-payment-transaction.dto';
import { PaymentTransactionService } from './payment-transaction.service';

@Controller({ path: EApiPathName.PAYMENT_TRANSACTION })
export class PaymentTransactionController {
  constructor(
    private readonly paymentTransactionService: PaymentTransactionService,
  ) {}

  @Post()
  @Permissions(ERole.USER)
  create(
    @Ip() ip: string,
    @Body() createPaymentTransactionDto: CreatePaymentTransactionDto,
    @Req() req: Rq,
  ) {
    const realIp =
      req.headers['x-forwarded-for'] || ip || req.socket.remoteAddress;

    return this.paymentTransactionService.create({
      ...createPaymentTransactionDto,
      ipAddress: realIp as string,
    });
  }

  @Post('create-order')
  @Permissions(ERole.USER)
  createOrder(
    @GetUser() user: UserParams,
    @Body() createPaymentTransactionDto: CreatePaymentTransactionOrderDto,
  ) {
    return this.paymentTransactionService.verifyAndCreateOrder({
      ...createPaymentTransactionDto,
      userEmail: user?.email,
      userId: user?.id,
    });
  }
}
