import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Score } from './schemas/score.schema';
import { CreateScoreDto } from './dto/create-score.dto';

@Injectable()
export class ScoreService {
  constructor(
    @InjectModel(Score.name) private readonly scoreModel: PaginateModel<Score>,
  ) {}

  async createScore({
    createScoreDto,
  }: {
    createScoreDto: CreateScoreDto;
  }): Promise<Score> {
    const newScore = new this.scoreModel(createScoreDto);
    return newScore.save();
  }

  async getAllSubjectScores({
    classSubject,
    academicYear,
    term,
  }: {
    term: string;
    classSubject: string;
    academicYear: string;
  }) {
    return this.scoreModel.paginate(
      { classSubject, academicYear, term },
      {
        populate: [
          {
            path: 'academicYear',
            select: 'startYear endYear',
          },
          {
            path: 'classStudent',
            select: 'student',
            populate: {
              path: 'student',
              select: 'name',
            },
          },
        ],
      },
    );
  }

  async getAllStudentScores({
    classStudent,
    academicYear,
    term,
  }: {
    term: string;
    classStudent: string;
    academicYear: string;
  }): Promise<Score[]> {
    return this.scoreModel.find({ classStudent, academicYear, term });
  }

  async getScoreById(id: string): Promise<Score> {
    return this.scoreModel.findById(id).exec();
  }

  async getScoresForStudent({
    classStudentId,
    academicYearId,
    term,
  }: {
    classStudentId: string;
    academicYearId: string;
    term: string;
  }): Promise<any> {
    const scores = await this.scoreModel
      .find({
        classStudent: classStudentId,
        academicYear: academicYearId,
        term,
      })
      .exec();

    const termAverage = this.calculateTermAverage(scores);

    return {
      scores,
      termAverage,
    };
  }

  private calculateTermAverage(scores: Score[]): number {
    const totalScore = scores.reduce(
      (sum, score) => sum + score.total,
      // (sum, score) => sum + (score.CA + score.exam),
      0,
    );
    return scores.length ? totalScore / scores.length : 0;
  }
}
