import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
    const hashedPassword = await bcrypt.hash(password, 10);

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
    const { password, username } = createAuthDto;

    const user = await this.userRepository.findOne({
      where: [{ username }],
    });

    if (!user) {
      throw new BadRequestException('User not found. Please register first');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      access_token: this.generateToken(user),
      message: 'Login successful',
    };
  }
}
