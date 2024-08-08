import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsService } from './students.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IAuthPayload } from 'src/shared/interfaces/schema.interface';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(
    @CurrentUser() user: IAuthPayload,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    return this.studentsService.create({ createStudentDto, user });
  }

  @Get()
  findAll(@CurrentUser() user: IAuthPayload) {
    return this.studentsService.findAll({ user });
  }

  @Get('/school/:schoolId')
  findSchoolStudents(@Param('schoolId') schoolId: string) {
    return this.studentsService.findSchoolStudents(schoolId);
  }

  @Get('/class/:currentClass')
  findClassStudents(@Param('schoolId') schoolId: string) {
    return this.studentsService.findClassStudents(schoolId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
