import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClassStudent } from '../schemas/class-student.schema';
import { CreateClassStudentDto } from '../dto/creates.dto';
import { StudentsService } from 'src/students/students.service';
import { CreateStudentDto } from 'src/students/dto/create-student.dto';
import { IAuthPayload } from 'src/shared/interfaces/schema.interface';
import { PaginateModel } from 'mongoose';

@Injectable()
export class ClassStudentService {
  constructor(
    @InjectModel(ClassStudent.name)
    private classStudentModel: PaginateModel<ClassStudent>,
    private readonly studentsService: StudentsService,
  ) {}

  async createStudent({
    user,
    createStudentDto,
  }: {
    createStudentDto: CreateStudentDto;
    user: IAuthPayload;
  }): Promise<ClassStudent> {
    const student = await this.studentsService.create({
      user,
      createStudentDto,
    });

    const assignment = new this.classStudentModel({
      student: student._id,
      class: createStudentDto.currentClass,
      academicYear: user.academicYear,
    });
    return assignment.save();
  }

  async assignStudent(
    createClassStudentDto: CreateClassStudentDto,
  ): Promise<ClassStudent> {
    const assignment = new this.classStudentModel(createClassStudentDto);
    return assignment.save();
  }

  async getAllStudentScores({
    classId,
    academicYear,
  }: {
    classId: string;
    academicYear: string;
  }) {
    const pipeline = [
      {
        $match: {
          class: classId,
          academicYear,
        },
      },
      {
        $addFields: {
          stringId: { $toString: '$_id' },
        },
      },
      {
        $lookup: {
          from: 'scores',
          localField: 'stringId',
          foreignField: 'classStudent',
          as: 'scores',
        },
      },
    ];
    return await this.classStudentModel.aggregate(pipeline);
  }

  async findAllForClass(classId: string, academicYear: string) {
    return this.classStudentModel.paginate(
      { class: classId, academicYear },
      { populate: 'student academicYear' },
    );
  }

  async removeStudentFromClass(
    classId: string,
    studentId: string,
    academicYear: string,
  ): Promise<void> {
    const result = await this.classStudentModel
      .deleteOne({ class: classId, student: studentId, academicYear })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Assignment not found');
    }
  }
}
