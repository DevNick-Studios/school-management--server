import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ timestamps: true })
export class ClassSubjects {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Class' })
  class: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Subject' })
  subject: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Teacher' })
  teacher: Types.ObjectId;
}

export const ClassSubjectsSchema = SchemaFactory.createForClass(ClassSubjects);
ClassSubjectsSchema.plugin(mongoosePaginate);

ClassSubjectsSchema.index({ class: 1, subject: 1 }, { unique: true });
