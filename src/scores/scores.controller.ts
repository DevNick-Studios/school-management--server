import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ScoreService } from './scores.service';
import { CreateScoreDto, GetScoresQuery } from './dto/create-score.dto';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  create(@Body() createScoreDto: CreateScoreDto) {
    return this.scoreService.createScore({ createScoreDto });
  }

  @Get('/students/:classStudent')
  getAllStudentScores(
    @Param('classStudent') classStudent: string,
    @Query() query: GetScoresQuery,
  ) {
    return this.scoreService.getAllStudentScores({
      classStudent,
      term: query.term,
      academicYear: query.academicYear,
    });
  }

  @Get('/subjects/:classSubject')
  getAllSubjectScores(
    @Param('classSubject') classSubject: string,
    @Query() query: GetScoresQuery,
  ) {
    return this.scoreService.getAllSubjectScores({
      classSubject,
      term: query.term,
      academicYear: query.academicYear,
    });
  }
}
