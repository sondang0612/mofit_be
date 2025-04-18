import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { instanceToInstance } from 'class-transformer';
import { EEnv } from 'src/common/constants/env.enum';
import { redisKeys } from 'src/common/constants/redis';
import { UserParams } from 'src/common/decorators/user.decorator';
import { RedisService } from 'src/common/modules/redis/redis.service';
import { comparePassword } from 'src/common/utils/compare-password';
import { hashPassword } from 'src/common/utils/hash-password';
import { User } from 'src/database/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from '../users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private redisService: RedisService,
    private configService: ConfigService,
  ) {}

  generateToken(payload: User) {
    const jid = uuidv4();
    this.redisService.set(
      redisKeys.USER_JID.replace('$userId', `${payload.id}`),
      jid,
      this.configService.get<number>(EEnv.USER_JID_TTL),
    );
    return this.jwtService.sign({
      id: payload.id,
      jid,
    });
  }

  async register(createAuthDto: RegisterAuthDto) {
    const { email, password, username, phoneNumber } = createAuthDto;

    const existingUser = await this.usersService.repository.findOne({
      where: [
        { email, isDeleted: false },
        { username, isDeleted: false },
        { phoneNumber, isDeleted: false },
      ],
    });

    if (existingUser) {
      throw new BadRequestException('Tài khoản đã tồn tại');
    }
    const hashedPassword = await hashPassword(password);

    const newUser = await this.usersService._create({
      ...createAuthDto,
      password: hashedPassword,
    });

    return {
      access_token: this.generateToken(newUser),
      fullName: `${newUser?.lastName} ${newUser?.firstName}`,
      role: newUser?.role,
      message: 'Register successful',
    };
  }

  async login(createAuthDto: LoginAuthDto) {
    const { password, username, role } = createAuthDto;

    const user = await this.usersService.repository.findOne({
      where: [
        { email: username, role, isDeleted: false },
        { username, role, isDeleted: false },
      ],
    });

    if (!user) {
      throw new BadRequestException('User not found. Please register first');
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      access_token: this.generateToken(user),
      fullName: `${user.lastName} ${user.firstName}`,
      role: user.role,
      message: 'Login successful',
    };
  }

  async logout(user: UserParams) {
    await this.redisService.delete(
      redisKeys.USER_JID.replace('$userId', `${user.id}`),
    );

    return {
      message: 'Logout successfully',
    };
  }

  async getProfile(args: UserParams) {
    return {
      data: args,
      message: 'Get profile successfully',
    };
  }

  async updateProfile(args: UpdateProfileDto, userParams: UserParams) {
    const { firstName, lastName, phoneNumber, currentPassword, newPassword } =
      args;
    const { id: userId, email: userEmail } = userParams;

    const user = await this.usersService._findOneOrFail({
      where: { id: userId, email: userEmail },
    });
    if (currentPassword) {
      const isPasswordValid = await comparePassword(
        currentPassword,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      user.password = await hashPassword(newPassword);
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;

    await this.usersService.repository.save(user);

    return {
      data: instanceToInstance(user),
      message: 'Get profile successfully',
    };
  }
}
