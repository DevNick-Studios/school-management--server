import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ISchool } from 'src/shared/interfaces/schema.interface';

export type SchoolDocument = HydratedDocument<School>;

@Schema({ timestamps: true })
export class School implements ISchool {
  @Prop({ required: true })
  name: string;

  @Prop()
  inceptionDate: string;

  @Prop()
  location: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: string | Types.ObjectId;
}

export const SchoolSchema = SchemaFactory.createForClass(School);

SchoolSchema.index({ owner: 1 });
