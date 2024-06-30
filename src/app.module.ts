import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SchoolsModule } from './schools/schools.module';
import { ClassModule } from './class/class.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { SubjectsModule } from './subjects/subjects.module';
import { SharedModule } from './shared/shared.module';
import { ScoresModule } from './scores/scores.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    AuthModule,
    UsersModule,
    SchoolsModule,
    ClassModule,
    TeachersModule,
    StudentsModule,
    SubjectsModule,
    SharedModule,
    ScoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
