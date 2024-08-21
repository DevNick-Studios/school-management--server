import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ClassSubjectsService } from '../services/class-subjects.service';
import { CreateClassSubjectDto } from '../dto/creates.dto';

@Controller('class-subjects')
export class ClassSubjectsController {
  constructor(private readonly classSubjectsService: ClassSubjectsService) {}

  @Post()
  async assignSubject(@Body() createClassSubjectsDto: CreateClassSubjectDto) {
    return this.classSubjectsService.assignSubject(createClassSubjectsDto);
  }

  @Get(':classId')
  async findAllForClass(@Param('classId') classId: string) {
    return this.classSubjectsService.findAllForClass(classId);
  }

  @Get('teachers/:teacherId')
  async findAllTeacherSubjects(@Param('teacherId') teacherId: string) {
    return this.classSubjectsService.findAllForTeacher({ teacherId });
  }

  @Delete(':classId/:subjectId')
  async removeAssignment(
    @Param('classId') classId: string,
    @Param('subjectId') subjectId: string,
  ) {
    return this.classSubjectsService.removeAssignment(classId, subjectId);
  }
}
