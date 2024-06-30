import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { GenderEnum, IStudent } from 'src/shared/interfaces/schema.interface';

export type StudentDocument = HydratedDocument<Student>;

@Schema({ timestamps: true })
export class Student implements IStudent {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  schoolId: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, type: String, enum: GenderEnum })
  gender: GenderEnum;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  currentClass: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Class' }] })
  previousClasses: Types.ObjectId[];

  @Prop()
  email?: string;

  @Prop()
  password?: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
