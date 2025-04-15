import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusLog } from 'src/database/entities/order-status-log.entity';
import { OrderStatusLogsController } from './order-status-logs.controller';
import { OrderStatusLogsService } from './order-status-logs.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatusLog])],
  controllers: [OrderStatusLogsController],
  providers: [OrderStatusLogsService],
  exports: [OrderStatusLogsService],
})
export class OrderStatusLogsModule {}
