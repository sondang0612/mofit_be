import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { instanceToInstance } from 'class-transformer';
import { comparePassword } from 'src/common/utils/comparePassword';
import { hashPassword } from 'src/common/utils/hashPassword';
import { User } from 'src/database/entities/user.entity';
import { UsersRepository } from '../users/users.repository';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  generateToken(payload: User) {
    return this.jwtService.sign({
      id: payload.id,
      email: payload.email,
    });
  }

  async register(createAuthDto: RegisterAuthDto) {
    const { email, password, phoneNumber, username } = createAuthDto;

    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { phoneNumber }, { username }],
    });

    if (existingUser) {
      throw new BadRequestException(
        'Email, phone number, or username already exists',
      );
    }
    const hashedPassword = await hashPassword(password);

    const newUser = await this.userRepository.create({
      ...createAuthDto,
      password: hashedPassword,
    });

    return {
      access_token: this.generateToken(newUser),
      message: 'Register successful',
    };
  }

  async login(createAuthDto: LoginAuthDto) {
    const { password, email } = createAuthDto;

    const user = await this.userRepository.findOne({
      where: [{ email }],
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
      message: 'Login successful',
    };
  }

  async getProfile(args: { id: number; email: string }) {
    const { id, email } = args;

    const user = await this.userRepository._findOneOrFail({
      where: { id, email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return {
      data: instanceToInstance(user),
      message: 'Get profile successfully',
    };
  }
}
