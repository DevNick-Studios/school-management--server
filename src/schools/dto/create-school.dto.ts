import { IsString } from 'class-validator';
import { ISchool } from 'src/shared/interfaces/schema.interface';

export class CreateSchoolDto implements ISchool {
  @IsString()
  name: string;

  @IsString()
  inceptionDate: string;

  @IsString()
  location: string;
}
