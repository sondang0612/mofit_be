import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ProductLikeModule } from '../product-like/product-like.module';

@Module({
  imports: [UsersModule, ProductLikeModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
