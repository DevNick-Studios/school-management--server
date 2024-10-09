import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IClass } from 'src/shared/interfaces/schema.interface';

export class CreateClassDto implements Omit<IClass, 'school' | 'grade'> {
  @IsString()
  title: string;

  // @IsOptional()
  @IsString()
  formTeacher: string;

  @IsOptional()
  @IsNumber()
  grade?: number; // Numeric value for the level within the stage
}
