import { IsEnum, IsOptional, IsString } from 'class-validator';
import { GenderEnum, ITeacher } from 'src/shared/interfaces/schema.interface';

export class CreateTeacherDto implements ITeacher {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  email: string;

  @IsString()
  schoolId: string;

  @IsEnum(GenderEnum)
  @IsOptional()
  gender: GenderEnum;
}
