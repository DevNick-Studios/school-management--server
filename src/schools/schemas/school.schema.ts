import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ISchool } from 'src/shared/interfaces/schema.interface';

export type SchoolDocument = HydratedDocument<School>;

@Schema({ timestamps: true })
export class School implements ISchool {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  inceptionDate: string;

  @Prop({ required: true })
  location: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
