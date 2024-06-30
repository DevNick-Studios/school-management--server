import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ITeacher } from 'src/shared/interfaces/schema.interface';

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema({ timestamps: true })
export class Teacher implements ITeacher {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  schoolId: string;

  @Prop({ required: true })
  email: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
