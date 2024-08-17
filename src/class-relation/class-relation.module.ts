import { Module } from '@nestjs/common';
import { ClassRelationService } from './class-relation.service';
import { ClassRelationController } from './class-relation.controller';
import {
  ClassStudent,
  ClassStudentsSchema,
} from './schemas/class-student.schema';
import {
  ClassSubject,
  ClassSubjectsSchema,
} from './schemas/class.subject.schema';
import { ClassSubjectsService } from './services/class-subjects.service';
import { ClassStudentService } from './services/class-students.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassSubjectsController } from './controllers/class-subjects.controller';
import { ClassStudentsController } from './controllers/class-students.controller';
import { Class, ClassSchema } from 'src/class/schemas/Class.schema';
import { Subject, SubjectSchema } from 'src/subjects/schemas/subjects.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClassStudent.name, schema: ClassStudentsSchema },
      { name: ClassSubject.name, schema: ClassSubjectsSchema },
      { name: Class.name, schema: ClassSchema },
      { name: Subject.name, schema: SubjectSchema },
    ]),
  ],
  controllers: [
    ClassRelationController,
    ClassSubjectsController,
    ClassStudentsController,
  ],
  providers: [ClassRelationService, ClassSubjectsService, ClassStudentService],
})
export class ClassRelationModule {}
