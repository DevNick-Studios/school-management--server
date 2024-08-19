import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ClassStudentService } from '../services/class-students.service';
import { CreateClassStudentDto } from '../dto/creates.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IAuthPayload } from 'src/shared/interfaces/schema.interface';
import { CreateStudentDto } from 'src/students/dto/create-student.dto';

@Controller('class-students')
export class ClassStudentsController {
  constructor(private readonly classStudentService: ClassStudentService) {}

  @Post()
  createStudent(
    @CurrentUser() user: IAuthPayload,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    return this.classStudentService.createStudent({ createStudentDto, user });
  }

  @Post('assign')
  async assignStudent(@Body() createClassStudentDto: CreateClassStudentDto) {
    return this.classStudentService.assignStudent(createClassStudentDto);
  }

  @Get(':classId/:academicYear')
  async findAllForClass(
    @Param('classId') classId: string,
    @Param('academicYear') academicYear: string,
  ) {
    return this.classStudentService.findAllForClass(classId, academicYear);
  }

  @Delete(':classId/:studentId/:academicYear')
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
