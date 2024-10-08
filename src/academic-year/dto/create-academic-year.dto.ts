import {
  IsString,
  IsEnum,
  IsOptional,
  Matches,
  IsNotEmpty,
} from 'class-validator';
import {
  IAcademicYear,
  TermEnum,
} from 'src/shared/interfaces/schema.interface';

export class CreateAcademicYearDto implements Omit<IAcademicYear, 'isActive'> {
  @IsString()
  @IsOptional()
  school: string;

  @IsString()
  @IsNotEmpty({ message: 'Year range is required' })
  @Matches(/^\d{4}\/\d{4}$/, {
    message: 'Year range must be in the format YYYY/YYYY',
  })
  year: string;

  @IsOptional()
  @IsString()
  @IsEnum(TermEnum)
  activeTerm: TermEnum;
}

export class ChangeActiveTerm {
  @IsOptional()
  @IsString()
  @IsEnum(TermEnum)
  activeTerm: TermEnum;
}
