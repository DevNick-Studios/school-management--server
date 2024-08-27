import { IsString, IsEnum, IsOptional } from 'class-validator';
import {
  IAcademicYear,
  TermEnum,
} from 'src/shared/interfaces/schema.interface';

export class CreateAcademicYearDto implements Omit<IAcademicYear, 'isActive'> {
  @IsString()
  @IsOptional()
  school: string;

  @IsString()
  year: string;

  @IsOptional()
  @IsString()
  @IsEnum(TermEnum)
  activeTerm: TermEnum;
}
