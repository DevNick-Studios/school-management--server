import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { IClass } from 'src/shared/interfaces/schema.interface';

export class CreateClassDto implements Omit<IClass, 'school'> {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  formTeacher: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  grade: number; // Numeric value for the level within the stage
}
