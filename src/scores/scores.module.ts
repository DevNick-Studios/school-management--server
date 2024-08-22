import { Module } from '@nestjs/common';
import { ScoreService } from './scores.service';
import { ScoresController } from './scores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './schemas/score.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]),
  ],
  controllers: [ScoresController],
  providers: [ScoreService],
  exports: [ScoreService],
})
export class ScoresModule {}
