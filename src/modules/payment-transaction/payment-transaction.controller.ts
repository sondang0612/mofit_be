import {
  Body,
  Controller,
  Ip,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as Rq } from 'express';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePaymentTransactionDto } from './dto/create-payment-transaction.dto';
import { PaymentTransactionService } from './payment-transaction.service';
import { CreatePaymentTransactionOrderDto } from './dto/create-payment-transaction-order.dto';

@Controller({ path: EApiPathName.PAYMENT_TRANSACTION })
@UseGuards(JwtAuthGuard)
export class PaymentTransactionController {
  constructor(
    private readonly paymentTransactionService: PaymentTransactionService,
  ) {}

  @Post()
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
  createOrder(
    @Request() req,
    @Body() createPaymentTransactionDto: CreatePaymentTransactionOrderDto,
  ) {
    return this.paymentTransactionService.verifyAndCreateOrder({
      ...createPaymentTransactionDto,
      userEmail: req?.user?.email,
      userId: req?.user?.id,
    });
  }
}
