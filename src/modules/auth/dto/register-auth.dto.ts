import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class RegisterAuthDto extends PartialType(CreateUserDto) {}
