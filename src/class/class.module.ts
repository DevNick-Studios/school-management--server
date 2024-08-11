import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './schemas/class.schema';
import { ClassService } from './class.service';
import {
  ClassStudents,
  ClassStudentsSchema,
} from './schemas/class-student.schema';
import {
  ClassTeachers,
  ClassTeachersSchema,
} from './schemas/class-teacher.schema';
import {
  ClassSubjects,
  ClassSubjectsSchema,
} from './schemas/class.subject.schema';
import { ClassSubjectsController } from './controllers/class-subjects.controller';
import { ClassTeachersController } from './controllers/class-teachers.controller';
import { ClassStudentsController } from './controllers/class-students.controller';
import { ClassSubjectsService } from './services/class-subjects.service';
import { ClassTeachersService } from './services/class-teachers.service';
import { ClassStudentsService } from './services/class-students.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: ClassStudents.name, schema: ClassStudentsSchema },
      { name: ClassTeachers.name, schema: ClassTeachersSchema },
      { name: ClassSubjects.name, schema: ClassSubjectsSchema },
    ]),
  ],
  controllers: [
    ClassController,
    ClassSubjectsController,
    ClassTeachersController,
    ClassStudentsController,
  ],
  providers: [
    ClassService,
    ClassSubjectsService,
    ClassTeachersService,
    ClassStudentsService,
  ],
})
export class ClassModule {}
