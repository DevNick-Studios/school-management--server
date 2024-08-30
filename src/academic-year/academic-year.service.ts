import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { AcademicYear } from './schemas/academic-year.schema';
import {
  IAcademicYear,
  IAuthPayload,
} from 'src/shared/interfaces/schema.interface';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';

@Injectable()
export class AcademicYearService {
  constructor(
    @InjectModel(AcademicYear.name)
    private academicYearModel: PaginateModel<AcademicYear>,
  ) {}

  async create(
    createAcademicYearDto: CreateAcademicYearDto,
  ): Promise<AcademicYear> {
    const newYear = new this.academicYearModel({
      ...createAcademicYearDto,
      count: 1,
    });
    return newYear.save();
  }

  async findById(id: string) {
    return await this.academicYearModel.findById(id);
  }

  async findOne(data: Partial<IAcademicYear>) {
    return await this.academicYearModel.findOne(data);
  }

  async createAcademicYear({
    createAcademicYearDto,
    user,
  }: {
    createAcademicYearDto: CreateAcademicYearDto;
    user: IAuthPayload;
  }): Promise<AcademicYear> {
    const payload = {
      ...createAcademicYearDto,
      school: user.school,
    };

    const existingYear = await this.academicYearModel.findOne(payload);
    if (existingYear) {
      throw new BadRequestException('Academic year already exists');
    }

    const session = await this.academicYearModel
      .findOne({ school: user.school })
      .sort('-count');

    if (!session) {
      return await this.academicYearModel.create({
        ...createAcademicYearDto,
        count: 1,
        school: user.school,
      });
    } else {
      return await this.academicYearModel.create({
        ...createAcademicYearDto,
        count: ++session.count,
        school: user.school,
      });
    }
  }

  async getAcademicYears({ user }: { user: IAuthPayload }) {
    return this.academicYearModel.paginate({ school: user.school });
  }

  async getAllAcademicYears({ user }: { user: IAuthPayload }) {
    return this.academicYearModel.find({ school: user.school });
  }

  async getActiveAcademicYear({
    user,
  }: {
    user: IAuthPayload;
  }): Promise<AcademicYear> {
    return this.academicYearModel
      .findOne({
        school: user.school,
        isActive: true,
      })
      .exec();
  }

  async getActiveAcademicYearBySchoolId({ school }: { school: string }) {
    return this.academicYearModel
      .findOne({
        school: school.toString(),
        isActive: true,
      })
      .exec();
  }

  async activateAcademicYear({
    user,
    id,
  }: {
    user: IAuthPayload;
    id: string;
  }): Promise<AcademicYear> {
    // Deactivate all academic years
    await this.academicYearModel.updateMany(
      { school: user.school },
      { isActive: false },
    );

    // Activate the specified academic year
    return this.academicYearModel
      .findByIdAndUpdate(id, { isActive: true }, { new: true })
      .exec();
  }

  async deactivateAcademicYear(id: string): Promise<AcademicYear> {
    return this.academicYearModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .exec();
  }
}
