import { IsEnum, IsOptional, IsString } from 'class-validator';
import { GenderEnum, ITeacher } from 'src/shared/interfaces/schema.interface';

export class CreateTeacherDto implements Omit<ITeacher, 'school'> {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  email: string;

  @IsEnum(GenderEnum)
  @IsOptional()
  gender: GenderEnum;
}
