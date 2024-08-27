import { IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ISchool } from 'src/shared/interfaces/schema.interface';

export class CreateSchoolDto implements ISchool {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  inceptionDate: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  session: string;

  @IsString()
  term: string;

  @IsString()
  @IsOptional()
  owner: string | Types.ObjectId;
}
