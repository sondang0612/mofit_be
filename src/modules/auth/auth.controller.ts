import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { EAuth } from 'src/common/constants/auth.enum';
import { ERole } from 'src/common/constants/role.enum';
import { ExtractUser, UserParams } from 'src/common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Auth, Permissions } from './guards/global-auth.guard';

@Controller(EApiPathName.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Auth(EAuth.NONE)
  login(@Body() args: LoginAuthDto) {
    return this.authService.login(args);
  }

  @Post('register')
  @Auth(EAuth.NONE)
  register(@Body() args: RegisterAuthDto) {
    return this.authService.register(args);
  }

  @Get('profile')
  @Permissions(ERole.ADMIN, ERole.USER)
  profile(@ExtractUser() user: UserParams) {
    return this.authService.getProfile(user);
  }

  @Put('profile')
  @Permissions(ERole.ADMIN, ERole.USER)
  updateProfile(
    @ExtractUser() user: UserParams,
    @Body() args: UpdateProfileDto,
  ) {
    return this.authService.updateProfile(args, user);
  }
}
