import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './schemas/class.schema';
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
    if (!user.school)
      throw new BadRequestException('School Id must be provided');
    const classObj = await this.ClassModel.findOne({
      school: user.school,
    }).sort('-grade');
    if (!classObj) {
      return await this.ClassModel.create({
        ...createClassDto,
        grade: 1,
        school: user.school,
      });
    } else {
      return await this.ClassModel.create({
        ...createClassDto,
        grade: ++classObj.grade,
        school: user.school,
      });
    }
  }

  async switchGradeLevel({
    user,
    id,
    updateClassDto,
  }: {
    id: string;
    updateClassDto: Partial<CreateClassDto>;
    user: IAuthPayload;
  }) {
    const classObj2 = await this.ClassModel.findOne({
      school: user.school,
      grade: updateClassDto.grade,
    });

    if (!classObj2) {
      return await this.ClassModel.findByIdAndUpdate(id, updateClassDto, {
        new: true,
      });
    }

    const classObj = await this.ClassModel.findById(id);
    const temp = classObj2.grade;

    classObj2.grade = classObj.grade;
    classObj.grade = temp;

    await classObj.save();
    await classObj2.save();

    return classObj;
  }

  async assignFormTeacher({
    id,
    formTeacher,
  }: {
    id: string;
    formTeacher: string;
  }) {
    return await this.ClassModel.findByIdAndUpdate(id, { formTeacher });
  }

  async findAllPaginate({ user }: { user: IAuthPayload }) {
    return await this.ClassModel.paginate(
      { school: user.school },
      {
        populate: {
          path: 'formTeacher',
          select: 'name',
        },
      },
    );
  }

  async findAll({ user }: { user: IAuthPayload }) {
    return await this.ClassModel.find({ school: user.school });
  }

  async findTeacherClasses({ user }: { user: IAuthPayload }) {
    return await this.ClassModel.paginate(
      {
        school: user.school,
        formTeacher: user.accountId,
      },
      {
        populate: {
          path: 'formTeacher',
          select: 'name',
        },
      },
    );
  }

  async findSchoolClasses(schoolId: string) {
    return await this.ClassModel.find({ schoolId });
  }

  async findById(id: string) {
    return await this.ClassModel.findById(id);
  }

  async findOne(data: Partial<IClass>) {
    return await this.ClassModel.findOne(data);
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
