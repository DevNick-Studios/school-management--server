import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ timestamps: true })
export class ClassStudent {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Class' })
  class: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Student' })
  student: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'AcademicYear' })
  academicYear: Types.ObjectId;
}

export const ClassStudentsSchema = SchemaFactory.createForClass(ClassStudent);
ClassStudentsSchema.plugin(mongoosePaginate);

ClassStudentsSchema.index(
  { class: 1, student: 1, academicYear: 1 },
  { unique: true },
);
