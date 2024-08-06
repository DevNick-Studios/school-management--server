import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './schemas/teacher.schema';
import { UsersService } from 'src/users/users.service';
import { AccountTypeEnum } from 'src/shared/interfaces/schema.interface';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name) private TeacherModel: PaginateModel<Teacher>,
    private readonly usersService: UsersService,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const { password: userPassword, ...other } = createTeacherDto;
    const user = await this.usersService.findOne(other.email);

    if (user && user.email) {
      throw new BadRequestException('Email Already in use');
    }

    const password = await this.usersService.hashPassword(userPassword);
    const newUser = await this.usersService.create({
      ...other,
      password,
      role: AccountTypeEnum.teacher,
    });

    const teacher = await this.TeacherModel.create(createTeacherDto);

    newUser.account = teacher._id;
    await newUser.save();

    return newUser;
  }

  async findOne(email: string) {
    return await this.TeacherModel.findOne({ email });
  }

  async findSchoolTeachers(schoolId: string) {
    return await this.TeacherModel.find({ schoolId });
  }

  // For Super Super Admin
  async findAll() {
    return await this.TeacherModel.paginate();
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
