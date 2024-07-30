import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { AccountTypeEnum, IUser } from 'src/shared/interfaces/schema.interface';

export class CreateUserDto implements IUser {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum({ type: AccountTypeEnum })
  role?: AccountTypeEnum;
}
