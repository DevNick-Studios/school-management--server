import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClassStudent } from '../schemas/class-student.schema';
import { CreateClassStudentDto } from '../dto/creates.dto';
import { StudentsService } from 'src/students/students.service';
import { CreateStudentDto } from 'src/students/dto/create-student.dto';
import { IAuthPayload } from 'src/shared/interfaces/schema.interface';
import { PaginateModel, PipelineStage } from 'mongoose';

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

  // async getAllStudentScores({
  //   classId,
  //   academicYear,
  //   term,
  // }: {
  //   classId: string;
  //   academicYear: string;
  //   term: string;
  // }) {
  //   const pipeline = [
  //     {
  //       $match: {
  //         class: classId,
  //         academicYear,
  //       },
  //     },
  //     {
  //       $addFields: {
  //         stringId: { $toString: '$_id' },
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: 'scores',
  //         localField: 'stringId',
  //         foreignField: 'classStudent',
  //         pipeline: [
  //           { $match: { term } },
  //           {
  //             $addFields: {
  //               total: {
  //                 $add: ['$CA', '$exam'],
  //               },
  //             },
  //           },
  //           {
  //             $project: {
  //               classSubject: 1,
  //               CA: 1,
  //               exam: 1,
  //               total: 1,
  //             },
  //           },
  //         ],
  //         as: 'scores',
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: 'students',
  //         localField: 'student',
  //         foreignField: '_id',
  //         pipeline: [
  //           {
  //             $project: {
  //               name: 1,
  //             },
  //           },
  //         ],
  //         as: 'student',
  //       },
  //     },
  //     {
  //       $addFields: {
  //         student: {
  //           $first: '$student',
  //         },
  //       },
  //     },
  //   ];
  //   return await this.classStudentModel.aggregate(pipeline);
  // }
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
