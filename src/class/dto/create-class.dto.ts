import { IsEnum, IsNumber, IsString } from 'class-validator';
import {
  EducationalStage,
  IClass,
} from 'src/shared/interfaces/schema.interface';

export class CreateClassDto implements IClass {
  @IsString()
  title: string;

  @IsEnum(EducationalStage)
  stage: EducationalStage; // Use the enum

  @IsNumber()
  level: number; // Numeric value for the level within the stage

  @IsString()
  schoolId: string;
}
