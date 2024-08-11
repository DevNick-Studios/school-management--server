import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassSubjects } from '../schemas/class.subject.schema';
import { CreateClassSubjectsDto } from '../dto/creates.dto';

@Injectable()
export class ClassSubjectsService {
  constructor(
    @InjectModel(ClassSubjects.name)
    private classSubjectsModel: Model<ClassSubjects>,
  ) {}

  async assignSubject(
    createClassSubjectsDto: CreateClassSubjectsDto,
  ): Promise<ClassSubjects> {
    const assignment = new this.classSubjectsModel(createClassSubjectsDto);
    return assignment.save();
  }

  async findAllForClass(classId: string): Promise<ClassSubjects[]> {
    return this.classSubjectsModel
      .find({ class: classId })
      .populate('subject teacher')
      .exec();
  }

  async removeAssignment(classId: string, subjectId: string): Promise<void> {
    const result = await this.classSubjectsModel
      .deleteOne({ class: classId, subject: subjectId })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Assignment not found');
    }
  }
}
