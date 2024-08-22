import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Score } from './schemas/score.schema';

@Injectable()
export class ScoreService {
  constructor(
    @InjectModel(Score.name) private readonly scoreModel: Model<Score>,
  ) {}

  async createScore(createScoreDto: any): Promise<Score> {
    const newScore = new this.scoreModel(createScoreDto);
    return newScore.save();
  }

  async getScoreById(id: string): Promise<Score> {
    return this.scoreModel.findById(id).exec();
  }

  async getScoresForStudent({
    studentId,
    academicYearId,
    term,
  }: {
    studentId: string;
    academicYearId: string;
    term: string;
  }): Promise<any> {
    const scores = await this.scoreModel
      .find({ student: studentId, academicYear: academicYearId, term })
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
