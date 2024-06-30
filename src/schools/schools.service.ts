import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { School } from './schemas/school.schema';

@Injectable()
export class SchoolsService {
  constructor(@InjectModel(School.name) private SchoolModel: Model<School>) {}

  async create(createSchoolDto: CreateSchoolDto) {
    try {
      return await this.SchoolModel.create(createSchoolDto);
    } catch (error) {
      throw new UnprocessableEntityException('Couldnt process your request');
    }
  }

  async findOne(email: string) {
    return await this.SchoolModel.findOne({ email });
  }

  // For Super Super Admin
  async findAll() {
    return await this.SchoolModel.find();
  }

  async findById(id: string) {
    return await this.SchoolModel.findById(id);
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto) {
    return await this.SchoolModel.findByIdAndUpdate(id, updateSchoolDto);
  }

  async remove(id: string) {
    return await this.SchoolModel.findByIdAndDelete(id);
  }
}
