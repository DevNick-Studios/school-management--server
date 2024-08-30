import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClassStudent } from '../schemas/class-student.schema';
import { CreateClassStudentDto } from '../dto/creates.dto';
import { StudentsService } from 'src/students/students.service';
import { CreateStudentDto } from 'src/students/dto/create-student.dto';
import {
  IAcademicYear,
  IAuthPayload,
  IClass,
} from 'src/shared/interfaces/schema.interface';
import { PaginateModel, PipelineStage } from 'mongoose';
import { CreateClassStudentsDto } from 'src/class/dto/creates.dto';
import { ClassService } from 'src/class/class.service';
import { AcademicYearService } from 'src/academic-year/academic-year.service';

@Injectable()
export class ClassStudentService {
  constructor(
    @InjectModel(ClassStudent.name)
    private classStudentModel: PaginateModel<ClassStudent>,
    private readonly studentsService: StudentsService,
    private readonly classService: ClassService,
    private readonly academicYearService: AcademicYearService,
  ) {}

  async create(
    createClassStudentDto: CreateClassStudentsDto,
  ): Promise<ClassStudent> {
    return this.classStudentModel.create(createClassStudentDto);
  }

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

    return await this.create({
      student: student._id.toString(),
      class: createStudentDto.currentClass.toString(),
      academicYear: user.academicYear,
    });
  }

  async assignStudent(
    createClassStudentDto: CreateClassStudentDto,
  ): Promise<ClassStudent> {
    const assignment = new this.classStudentModel(createClassStudentDto);
    return assignment.save();
  }

  async promoteStudent({ id, user }: { id: string; user: IAuthPayload }) {
    const classStudent = await this.classStudentModel
      .findById(id)
      .populate('class academicYear');
    if (!classStudent) throw new BadRequestException('Student does not exist');

    if (classStudent.promoted)
      throw new BadRequestException('Student already promoted');

    const newClass = await this.classService.findOne({
      school: user.school,
      grade: ++(classStudent.class as IClass).grade,
    });

    if (!newClass)
      throw new BadRequestException('This is the final class in the system');

    const newSession = await this.academicYearService.findOne({
      school: user.school,
      count: ++(classStudent.academicYear as IAcademicYear).count,
    });

    if (!newSession)
      throw new BadRequestException('No new Academic Year Added');

    const newClassStudent = await this.create({
      student: classStudent.student.toString(),
      academicYear: user.academicYear,
      class: newClass._id.toString(),
    });
    classStudent.promoted = true;
    await classStudent.save();

    return newClassStudent;
  }

  async getAllStudentScores({
    classId,
    academicYear,
    term,
    page = 1,
    limit = 10,
  }: {
    classId: string;
    academicYear: string;
    term: string;
    page: number;
    limit: number;
  }) {
    const pipeline: PipelineStage[] = [
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
          pipeline: [
            { $match: { term } },
            {
              $addFields: {
                total: {
                  $add: ['$CA', '$exam'],
                },
              },
            },
            {
              $project: {
                classSubject: 1,
                CA: 1,
                exam: 1,
                total: 1,
              },
            },
          ],
          as: 'scores',
        },
      },
      {
        $lookup: {
          from: 'students',
          localField: 'student',
          foreignField: '_id',
          pipeline: [
            {
              $project: {
                name: 1,
              },
            },
          ],
          as: 'student',
        },
      },
      {
        $addFields: {
          student: {
            $first: '$student',
          },
        },
      },
      {
        $addFields: {
          termTotal: {
            $sum: '$scores.total', // Sum of all total scores in the scores array
          },
          // termAverage: {
          //   $avg: '$scores.total', // Average of all total scores in the scores array (off, cos the num of scores might not be the total num of subjects)
          // },
        },
      },
      {
        $project: {
          student: 1,
          scores: 1,
          termTotal: 1,
          termAverage: 1,
        },
      },
      // Sort students by termTotal in descending order
      {
        $sort: {
          termTotal: -1, // Sort from highest to lowest
        },
      },
      // Add position field
      {
        $group: {
          _id: null,
          students: { $push: '$$ROOT' },
        },
      },
      {
        $unwind: {
          path: '$students',
          includeArrayIndex: 'position', // position is zero-indexed
        },
      },
      {
        $addFields: {
          'students.position': { $add: ['$position', 1] }, // Convert to 1-indexed
        },
      },
      {
        $replaceRoot: {
          newRoot: '$students',
        },
      },
      // for pagination - can be taken off for performance gains
      {
        $facet: {
          metadata: [
            { $count: 'totalDocs' },
            {
              $addFields: {
                page,
                limit,
                totalPages: {
                  $ceil: { $divide: ['$totalDocs', limit] },
                },
                offset: { $multiply: [{ $subtract: [page, 1] }, limit] },
              },
            },
          ],
          docs: [{ $skip: (page - 1) * limit }, { $limit: limit }],
        },
      },
      {
        $unwind: '$metadata',
      },
      {
        $addFields: {
          totalDocs: '$metadata.totalDocs',
          offset: '$metadata.offset',
          limit: '$metadata.limit',
          totalPages: '$metadata.totalPages',
          page: '$metadata.page',
        },
      },
      {
        $project: {
          metadata: 0,
        },
      },
    ];

    const result = await this.classStudentModel.aggregate(pipeline);
    return result[0];
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
