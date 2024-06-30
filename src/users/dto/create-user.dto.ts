import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IUser } from 'src/shared/interfaces/schema.interface';

export class CreateUserDto implements IUser {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  role?: string;
}
