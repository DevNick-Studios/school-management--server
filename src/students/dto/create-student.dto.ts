import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { GenderEnum, IStudent } from 'src/shared/interfaces/schema.interface';

export class CreateStudentDto implements IStudent {
  @IsString()
  schoolId: string;

  @IsString()
  name: string;

  @IsString()
  age: number;

  @IsString()
  currentClass: Types.ObjectId;

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
