import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { GenderEnum, IStudent } from 'src/shared/interfaces/schema.interface';

export class CreateStudentDto implements Omit<IStudent, 'school'> {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  class: Types.ObjectId;

  @IsEnum(GenderEnum)
  @IsOptional()
  gender: GenderEnum;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  email?: string;
}
