import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { IScore } from 'src/shared/interfaces/schema.interface';

export class CreateScoreDto implements IScore {
  @IsString()
  classStudent: string;

  @IsString()
  classSubject: string;

  @IsString()
  academicYear: string;

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
}

export interface GetScoresQuery {
  term: string;
  academicYear: string;
}
