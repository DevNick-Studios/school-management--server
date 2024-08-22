import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { IScore } from 'src/shared/interfaces/schema.interface';

export class CreateScoreDto
  implements Omit<IScore, 'student' | 'classSubject' | 'academicYear'>
{
  @IsString()
  term: string;

  @IsString()
  @IsOptional()
  remarks: string;

  @IsNumber()
  exam: number;

  @IsNumber()
  CA: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  total: number;

  // student: string;
  // classSubject: string;
  // academicYear: string;
}
