import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { EAuth } from 'src/common/constants/auth.enum';
import { ERole } from 'src/common/constants/role.enum';
import { Auth, Permissions } from '../auth/guards/global-auth.guard';
import { PaymentRefundDto } from './dto/payment-refund.dto';
import { VnpayIpnDto } from './dto/vnpay.dto';
import { PaymentsService } from './payments.service';
import { ExtractUser, UserParams } from 'src/common/decorators/user.decorator';

@Controller({ path: EApiPathName.PAYMENTS })
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('vnpay_ipn')
  @Auth(EAuth.NONE)
  handleVnpayIpnCallback(@Query() args: VnpayIpnDto) {
    return this.paymentsService.processPaymentIpnCallback(args);
  }

  @Post('refund')
  @Permissions(ERole.ADMIN)
  handleVnpayRefund(
    @Body() args: PaymentRefundDto,
    @ExtractUser() user: UserParams,
  ) {
    return this.paymentsService.handleRefund(args, user.ip);
  }
}
