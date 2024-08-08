import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './schemas/subjects.schema';
import { IAuthPayload } from 'src/shared/interfaces/schema.interface';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject.name) private SubjectModel: PaginateModel<Subject>,
  ) {}

  async create({
    user,
    createSubjectDto,
  }: {
    createSubjectDto: CreateSubjectDto;
    user: IAuthPayload;
  }) {
    return await this.SubjectModel.create({
      ...createSubjectDto,
      school: user.school,
    });
  }

  async findAll({ user }: { user: IAuthPayload }) {
    return await this.SubjectModel.paginate({ school: user.school });
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
  async findAllAdmin() {
    return await this.SubjectModel.paginate();
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
