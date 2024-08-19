import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './schemas/Student.schema';
import { IAuthPayload } from 'src/shared/interfaces/schema.interface';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private StudentModel: PaginateModel<Student>,
  ) {}

  async create({
    user,
    createStudentDto,
  }: {
    createStudentDto: CreateStudentDto;
    user: IAuthPayload;
  }) {
    return await this.StudentModel.create({
      ...createStudentDto,
      school: user.school,
    });
  }

  async findAll({ user }: { user: IAuthPayload }) {
    return await this.StudentModel.paginate(
      { school: user.school },
      { populate: { path: 'currentClass', select: 'title' } },
    );
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
  async findAllAdmin() {
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
