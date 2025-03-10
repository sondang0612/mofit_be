import { Module } from '@nestjs/common';
import { OrdersModule } from '../orders/orders.module';
import { PaymentsModule } from '../payments/payments.module';
import { PaymentTransactionController } from './payment-transaction.controller';
import { PaymentTransactionService } from './payment-transaction.service';

@Module({
  imports: [OrdersModule, PaymentsModule],
  controllers: [PaymentTransactionController],
  providers: [PaymentTransactionService],
  exports: [PaymentTransactionService],
})
export class PaymentTransactionModule {}
