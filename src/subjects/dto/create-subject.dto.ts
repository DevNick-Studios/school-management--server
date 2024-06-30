import { IsString } from 'class-validator';
import { ISubject } from 'src/shared/interfaces/schema.interface';

export class CreateSubjectDto implements ISubject {
  @IsString()
  name: string;

  @IsString()
  classId: string;

  @IsString()
  teacherId: string;
}
