import { Controller, Post, Body } from '@nestjs/common';
import { ScoreService } from './scores.service';
import { CreateScoreDto } from './dto/create-score.dto';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  create(@Body() createScoreDto: CreateScoreDto) {
    return this.scoreService.createScore(createScoreDto);
  }
}
