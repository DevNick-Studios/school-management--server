import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './schemas/Class.schema';

@Injectable()
export class ClassService {
  constructor(@InjectModel(Class.name) private ClassModel: Model<Class>) {}

  async create(createClassDto: CreateClassDto) {
    try {
      return await this.ClassModel.create(createClassDto);
    } catch (error) {
      throw new UnprocessableEntityException('Couldnt process your request');
    }
  }

  async findOne(email: string) {
    return await this.ClassModel.findOne({ email });
  }

  async findSchoolClasses(schoolId: string) {
    return await this.ClassModel.find({ schoolId });
  }

  // For Super Super Admin
  async findAll() {
    return await this.ClassModel.find();
  }

  async findById(id: string) {
    return await this.ClassModel.findById(id);
  }

  async update(id: string, updateClassDto: UpdateClassDto) {
    return await this.ClassModel.findByIdAndUpdate(id, updateClassDto);
  }

  async remove(id: string) {
    return await this.ClassModel.findByIdAndDelete(id);
  }
}
