import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ClassTeachersService } from '../services/class-teachers.service';
import { CreateClassTeachersDto } from '../dto/creates.dto';

@Controller('class-teachers')
export class ClassTeachersController {
  constructor(private readonly classTeachersService: ClassTeachersService) {}

  @Post()
  async assignTeacher(@Body() createClassTeachersDto: CreateClassTeachersDto) {
    return this.classTeachersService.assignTeacher(createClassTeachersDto);
  }

  @Get(':classId')
  async findAllForClass(@Param('classId') classId: string) {
    return this.classTeachersService.findAllForClass(classId);
  }

  @Delete(':classId/:teacherId')
  async removeTeacherFromClass(
    @Param('classId') classId: string,
    @Param('teacherId') teacherId: string,
  ) {
    return this.classTeachersService.removeTeacherFromClass(classId, teacherId);
  }
}
