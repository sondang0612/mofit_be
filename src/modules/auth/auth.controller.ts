import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { EApiPathName } from 'src/common/constants/api-path.enum';
import { EAuth } from 'src/common/constants/auth.enum';
import { ERole } from 'src/common/constants/role.enum';
import { ExtractUser, UserParams } from 'src/common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Auth, Permissions } from './guards/global-auth.guard';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller(EApiPathName.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Auth(EAuth.NONE)
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('register')
  @Auth(EAuth.NONE)
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Get('profile')
  @Permissions(ERole.ADMIN, ERole.USER)
  profile(@ExtractUser() user: UserParams) {
    return this.authService.getProfile(user);
  }

  @Put('update-profile')
  @Permissions(ERole.ADMIN, ERole.USER)
  updateProfile(
    @ExtractUser() user: UserParams,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.authService.updateProfile({
      ...updateProfileDto,
      userEmail: user?.email,
      userId: user?.id,
    });
  }
}
