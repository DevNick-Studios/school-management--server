import { IsString } from 'class-validator';
import { ITeacher } from 'src/shared/interfaces/schema.interface';

export class CreateTeacherDto implements ITeacher {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  email: string;

  @IsString()
  schoolId: string;
}
