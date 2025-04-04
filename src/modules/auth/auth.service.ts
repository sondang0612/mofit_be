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
import { UsersService } from '../users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  generateToken(payload: User) {
    return this.jwtService.sign({
      id: payload.id,
      email: payload.email,
      role: payload.role,
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

  async getProfile(args: { id: number; email: string }) {
    const { id, email } = args;

    const user = await this.usersService._findOneOrFail({
      where: { id, email },
    });

    return {
      data: instanceToInstance(user),
      message: 'Get profile successfully',
    };
  }

  async updateProfile(args: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    currentPassword: string;
    newPassword: string;
    userId: number;
    userEmail: string;
  }) {
    const {
      firstName,
      lastName,
      phoneNumber,
      currentPassword,
      newPassword,
      userId,
      userEmail,
    } = args;

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
