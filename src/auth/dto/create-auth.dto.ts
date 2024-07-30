import { IsEmail, IsString } from 'class-validator';
import { CreateSchoolDto } from 'src/schools/dto/create-school.dto';

export class CreateAuthDto extends CreateSchoolDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  schoolName: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
