import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ClassSubjectsService } from '../services/class-subjects.service';
import { CreateClassSubjectDto } from '../dto/creates.dto';

@Controller('classes')
export class ClassSubjectsController {
  constructor(private readonly classSubjectsService: ClassSubjectsService) {}

  @Post('subjects')
  async assignSubject(@Body() createClassSubjectsDto: CreateClassSubjectDto) {
    return this.classSubjectsService.assignSubject(createClassSubjectsDto);
  }

  @Get('subjects/:id')
  async findClassSubject(@Param('id') id: string) {
    return this.classSubjectsService.findClassSubject(id);
  }

  @Get(':classId/subjects')
  async findAllClassSubjectPaginated(@Param('classId') classId: string) {
    return this.classSubjectsService.findAllClassSubjectPaginated(classId);
  }

  @Get(':classId/subjects/all')
  async findAllClassSubject(@Param('classId') classId: string) {
    return this.classSubjectsService.findAllClassSubject(classId);
  }

  @Get('teachers/:teacherId/subjects')
  async findAllTeacherSubjects(@Param('teacherId') teacherId: string) {
    return this.classSubjectsService.findAllTeacherSubjects({ teacherId });
  }

  @Delete(':classId/subjects/:subjectId')
  async removeAssignment(
    @Param('classId') classId: string,
    @Param('subjectId') subjectId: string,
  ) {
    return this.classSubjectsService.removeAssignment(classId, subjectId);
  }
}
