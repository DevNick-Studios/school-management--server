import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ timestamps: true })
export class ClassTeachers {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Class' })
  class: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Teacher' })
  teacher: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'School' })
  school: Types.ObjectId;
}

export const ClassTeachersSchema = SchemaFactory.createForClass(ClassTeachers);
ClassTeachersSchema.plugin(mongoosePaginate);

ClassTeachersSchema.index({ class: 1, teacher: 1 }, { unique: true });
