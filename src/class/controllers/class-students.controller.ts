import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ClassStudentsService } from '../services/class-students.service';
import { CreateClassStudentsDto } from '../dto/creates.dto';

@Controller('class-students')
export class ClassStudentsController {
  constructor(private readonly classStudentsService: ClassStudentsService) {}

  @Post()
  async assignStudent(@Body() createClassStudentsDto: CreateClassStudentsDto) {
    return this.classStudentsService.assignStudent(createClassStudentsDto);
  }

  @Get(':classId/:academicYear')
  async findAllForClass(
    @Param('classId') classId: string,
    @Param('academicYear') academicYear: string,
  ) {
    return this.classStudentsService.findAllForClass(classId, academicYear);
  }

  @Delete(':classId/:studentId/:academicYear')
  async removeStudentFromClass(
    @Param('classId') classId: string,
    @Param('studentId') studentId: string,
    @Param('academicYear') academicYear: string,
  ) {
    return this.classStudentsService.removeStudentFromClass(
      classId,
      studentId,
      academicYear,
    );
  }
}
