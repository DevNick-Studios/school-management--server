import { IsNumber } from 'class-validator';
import { IAcademicYear } from 'src/shared/interfaces/schema.interface';

export class CreateAcademicYearDto
  implements Omit<IAcademicYear, 'school' | 'isActive'>
{
  @IsNumber()
  startYear: number;

  @IsNumber()
  endYear: number;
}
