import { Controller } from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { OrderStatusLogsService } from './order-status-logs.service';

@Controller({ path: EApiPathName.ORDER_STATUS_LOGS })
export class OrderStatusLogsController {
  constructor(
    private readonly orderStatusLogsService: OrderStatusLogsService,
  ) {}
}
