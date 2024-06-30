import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './schemas/teacher.schema';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name) private TeacherModel: Model<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    try {
      return await this.TeacherModel.create(createTeacherDto);
    } catch (error) {
      throw new UnprocessableEntityException('Couldnt process your request');
    }
  }

  async findOne(email: string) {
    return await this.TeacherModel.findOne({ email });
  }

  async findSchoolTeachers(schoolId: string) {
    return await this.TeacherModel.find({ schoolId });
  }

  // For Super Super Admin
  async findAll() {
    return await this.TeacherModel.find();
  }

  async findById(id: string) {
    return await this.TeacherModel.findById(id);
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    return await this.TeacherModel.findByIdAndUpdate(id, updateTeacherDto);
  }

  async remove(id: string) {
    return await this.TeacherModel.findByIdAndDelete(id);
  }
}
