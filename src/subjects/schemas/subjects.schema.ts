import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ISubject } from 'src/shared/interfaces/schema.interface';

@Schema({ timestamps: true })
export class Subject implements ISubject {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  teacherId: string;

  @Prop({ required: true })
  classId: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
