import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ClassStudentService } from '../services/class-students.service';
import { CreateClassStudentDto, GetScoresQuery } from '../dto/creates.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IAuthPayload } from 'src/shared/interfaces/schema.interface';
import { CreateStudentDto } from 'src/students/dto/create-student.dto';

@Controller('classes')
export class ClassStudentsController {
  constructor(private readonly classStudentService: ClassStudentService) {}

  @Post('students')
  createStudent(
    @CurrentUser() user: IAuthPayload,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    return this.classStudentService.createStudent({ createStudentDto, user });
  }

  @Post('students/assign')
  async assignStudent(@Body() createClassStudentDto: CreateClassStudentDto) {
    return this.classStudentService.assignStudent(createClassStudentDto);
  }

  @Post('students/:id/promote')
  async promoteStudent(
    @Param('id') id: string,
    @CurrentUser() user: IAuthPayload,
  ) {
    return this.classStudentService.promoteStudent({ id, user });
  }

  @Get(':classId/students/academic-year/:academicYear')
  async findAllForClass(
    @Param('classId') classId: string,
    @Param('academicYear') academicYear: string,
  ) {
    return this.classStudentService.findAllForClass(classId, academicYear);
  }

  @Get(':classId/scores')
  async getAllStudentScores(
    @Param('classId') classId: string,
    @Query() query: GetScoresQuery,
  ) {
    return this.classStudentService.getAllStudentScores({
      classId,
      academicYear: query.academicYear,
      term: query.term,
      page: query.page | 1,
      limit: query.limit || 10,
    });
  }

  @Delete(':classId/students/:studentId/academic-year/:academicYear')
  async removeStudentFromClass(
    @Param('classId') classId: string,
    @Param('studentId') studentId: string,
    @Param('academicYear') academicYear: string,
  ) {
    return this.classStudentService.removeStudentFromClass(
      classId,
      studentId,
      academicYear,
    );
  }
}
