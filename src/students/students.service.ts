import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './schemas/Student.schema';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private StudentModel: PaginateModel<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      return await this.StudentModel.create(createStudentDto);
    } catch (error) {
      throw new UnprocessableEntityException('Couldnt process your request');
    }
  }

  async findOne(email: string) {
    return await this.StudentModel.findOne({ email });
  }

  async findSchoolStudents(schoolId: string) {
    return await this.StudentModel.find({ schoolId });
  }

  async findClassStudents(currentClass: string) {
    return await this.StudentModel.find({ currentClass });
  }

  // For Super Super Admin
  async findAll() {
    return await this.StudentModel.paginate(
      {},
      { populate: { path: 'class', select: 'title' } },
    );
  }

  async findById(id: string) {
    return await this.StudentModel.findById(id);
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    return await this.StudentModel.findByIdAndUpdate(id, updateStudentDto);
  }

  async remove(id: string) {
    return await this.StudentModel.findByIdAndDelete(id);
  }
}
