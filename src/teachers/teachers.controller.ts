import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { IAuthPayload } from 'src/shared/interfaces/schema.interface';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  create(
    @CurrentUser() user: IAuthPayload,
    @Body() createTeacherDto: CreateTeacherDto,
  ) {
    return this.teachersService.create({ createTeacherDto, user });
  }

  @Get('all')
  findAll(@CurrentUser() user: IAuthPayload) {
    return this.teachersService.findAll({ user });
  }

  @Get()
  findAllPaginate(@CurrentUser() user: IAuthPayload) {
    return this.teachersService.findAllPaginate({ user });
  }

  // Admin
  @Get()
  findAllAdmin() {
    return this.teachersService.findAllAdmin();
  }

  @Get('/school/:schoolId')
  findSchoolTeachers(@Param('schoolId') schoolId: string) {
    return this.teachersService.findSchoolTeachers(schoolId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}
