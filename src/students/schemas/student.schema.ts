import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { GenderEnum, IStudent } from 'src/shared/interfaces/schema.interface';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type StudentDocument = HydratedDocument<Student>;

@Schema({ timestamps: true })
export class Student implements IStudent {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'School' })
  school: string | Types.ObjectId;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, type: String, enum: GenderEnum })
  gender: GenderEnum;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  class: Types.ObjectId;

  @Prop({})
  email?: string;

  @Prop()
  password?: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
StudentSchema.plugin(mongoosePaginate);

StudentSchema.index({ school: 1 });
