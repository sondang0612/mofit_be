import { Controller, Get, Query } from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { EAuth } from 'src/common/constants/auth.enum';
import { Auth } from '../auth/guards/global-auth.guard';
import { VnpayIpnDto } from './dto/vnpay.dto';
import { PaymentsService } from './payments.service';

@Controller({ path: EApiPathName.PAYMENTS })
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('vnpay_ipn')
  @Auth(EAuth.NONE)
  handleVnpayIpnCallback(@Query() vnpayIpnDto: VnpayIpnDto) {
    return this.paymentsService.processPaymentIpnCallback(vnpayIpnDto);
  }
}
