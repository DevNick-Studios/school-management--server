import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './schemas/subjects.schema';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject.name) private SubjectModel: Model<Subject>,
  ) {}

  async create(createClassDto: CreateSubjectDto) {
    try {
      return await this.SubjectModel.create(createClassDto);
    } catch (error) {
      throw new UnprocessableEntityException('Couldnt process your request');
    }
  }

  async findOne(email: string) {
    return await this.SubjectModel.findOne({ email });
  }

  async findClassSubjects(classId: string) {
    return await this.SubjectModel.find({ classId });
  }

  async findTeacherSubjects(teacherId: string) {
    return await this.SubjectModel.find({ teacherId });
  }

  // For Super Super Admin
  async findAll() {
    return await this.SubjectModel.find();
  }

  async findById(id: string) {
    return await this.SubjectModel.findById(id);
  }

  async update(id: string, updateClassDto: UpdateSubjectDto) {
    return await this.SubjectModel.findByIdAndUpdate(id, updateClassDto);
  }

  async remove(id: string) {
    return await this.SubjectModel.findByIdAndDelete(id);
  }
}
