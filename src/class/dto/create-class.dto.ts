import { IsString } from 'class-validator';
import { IClass } from 'src/shared/interfaces/schema.interface';

export class CreateClassDto implements IClass {
  @IsString()
  title: string;

  @IsString()
  schoolId: string;
}
