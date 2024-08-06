import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { Teacher, TeacherSchema } from './schemas/teacher.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
    UsersModule,
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
