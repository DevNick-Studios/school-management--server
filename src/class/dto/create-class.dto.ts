import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import {
  EducationalStage,
  IClass,
} from 'src/shared/interfaces/schema.interface';

export class CreateClassDto implements Omit<IClass, 'school'> {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  formTeacher: string;

  @IsEnum(EducationalStage)
  stage: EducationalStage; // Use the enum

  @IsNumber()
  @Min(1)
  level: number; // Numeric value for the level within the stage
}
