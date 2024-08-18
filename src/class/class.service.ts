import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './schemas/Class.schema';
import { IAuthPayload, IClass } from 'src/shared/interfaces/schema.interface';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private ClassModel: PaginateModel<Class>,
  ) {}

  async create({
    user,
    createClassDto,
  }: {
    createClassDto: CreateClassDto;
    user: IAuthPayload;
  }) {
    return await this.ClassModel.create({
      ...createClassDto,
      school: user.school,
    });
  }

  async findAll({ user }: { user: IAuthPayload }) {
    return await this.ClassModel.find({ school: user.school });
  }

  async findTeacherClasses({ user }: { user: IAuthPayload }) {
    return await this.ClassModel.find({ school: user.school });
  }

  async findAllPaginate({ user }: { user: IAuthPayload }) {
    return await this.ClassModel.paginate({ school: user.school });
  }

  async findSchoolClasses(schoolId: string) {
    return await this.ClassModel.find({ schoolId });
  }

  async findById(id: string) {
    return await this.ClassModel.findById(id);
  }

  async findOne(data: Partial<IClass>) {
    return await this.ClassModel.findById(data);
  }

  // For Super Super Admin
  async findAllAdminPaginate() {
    return await this.ClassModel.paginate();
  }

  async findAllAdmin() {
    return await this.ClassModel.find();
  }

  async update(id: string, updateClassDto: UpdateClassDto) {
    return await this.ClassModel.findByIdAndUpdate(id, updateClassDto);
  }

  async remove(id: string) {
    return await this.ClassModel.findByIdAndDelete(id);
  }
}
