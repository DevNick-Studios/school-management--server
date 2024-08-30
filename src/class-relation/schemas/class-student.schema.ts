import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { AcademicYear } from 'src/academic-year/schemas/academic-year.schema';
import { Class } from 'src/class/schemas/class.schema';
import { Student } from 'src/students/schemas/student.schema';

@Schema({ timestamps: true })
export class ClassStudent {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Class' })
  class: Types.ObjectId | Class;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Student' })
  student: Types.ObjectId | Student;

  @Prop({ required: true, type: Types.ObjectId, ref: 'AcademicYear' })
  academicYear: Types.ObjectId | AcademicYear;

  @Prop({ default: false })
  promoted: boolean;
}

export const ClassStudentsSchema = SchemaFactory.createForClass(ClassStudent);
ClassStudentsSchema.plugin(mongoosePaginate);

ClassStudentsSchema.index(
  { class: 1, student: 1, academicYear: 1 },
  { unique: true },
);
