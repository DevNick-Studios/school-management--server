import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IAuthPayload } from 'src/shared/interfaces/schema.interface';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(
    @CurrentUser() user: IAuthPayload,
    @Body() createClassDto: CreateClassDto,
  ) {
    return this.classService.create({ createClassDto, user });
  }

  @Get()
  findAllPaginate(@CurrentUser() user: IAuthPayload) {
    return this.classService.findAllPaginate({ user });
  }

  @Get('all')
  findAll(@CurrentUser() user: IAuthPayload) {
    return this.classService.findAll({ user });
  }

  @Get('admin')
  findAllAdmin() {
    return this.classService.findAllAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
  }

  @Get('/school/:schoolId')
  findSchoolClasses(@Param('schoolId') schoolId: string) {
    return this.classService.findSchoolClasses(schoolId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(id);
  }
}
