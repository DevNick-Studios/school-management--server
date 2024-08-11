import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassTeachers } from '../schemas/class-teacher.schema';
import { CreateClassTeachersDto } from '../dto/creates.dto';

@Injectable()
export class ClassTeachersService {
  constructor(
    @InjectModel(ClassTeachers.name)
    private classTeachersModel: Model<ClassTeachers>,
  ) {}

  async assignTeacher(
    createClassTeachersDto: CreateClassTeachersDto,
  ): Promise<ClassTeachers> {
    const assignment = new this.classTeachersModel(createClassTeachersDto);
    return assignment.save();
  }

  async findAllForClass(classId: string): Promise<ClassTeachers[]> {
    return this.classTeachersModel
      .find({ class: classId })
      .populate('teacher')
      .exec();
  }

  async removeTeacherFromClass(
    classId: string,
    teacherId: string,
  ): Promise<void> {
    const result = await this.classTeachersModel
      .deleteOne({ class: classId, teacher: teacherId })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Assignment not found');
    }
  }
}
