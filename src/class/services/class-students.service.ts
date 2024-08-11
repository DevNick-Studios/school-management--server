import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassStudents } from '../schemas/class-student.schema';
import { CreateClassStudentsDto } from '../dto/creates.dto';

@Injectable()
export class ClassStudentsService {
  constructor(
    @InjectModel(ClassStudents.name)
    private classStudentsModel: Model<ClassStudents>,
  ) {}

  async assignStudent(
    createClassStudentsDto: CreateClassStudentsDto,
  ): Promise<ClassStudents> {
    const assignment = new this.classStudentsModel(createClassStudentsDto);
    return assignment.save();
  }

  async findAllForClass(
    classId: string,
    academicYear: string,
  ): Promise<ClassStudents[]> {
    return this.classStudentsModel
      .find({ class: classId, academicYear })
      .populate('student')
      .exec();
  }

  async removeStudentFromClass(
    classId: string,
    studentId: string,
    academicYear: string,
  ): Promise<void> {
    const result = await this.classStudentsModel
      .deleteOne({ class: classId, student: studentId, academicYear })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Assignment not found');
    }
  }
}
