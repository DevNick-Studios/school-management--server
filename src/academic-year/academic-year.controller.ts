import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { AcademicYearService } from './academic-year.service';
import { IAuthPayload } from 'src/shared/interfaces/schema.interface';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';

@Controller('academic-year')
export class AcademicYearController {
  constructor(private readonly academicYearService: AcademicYearService) {}

  @Post()
  async create(
    @Body() createAcademicYearDto: CreateAcademicYearDto,
    @CurrentUser() user: IAuthPayload,
  ) {
    return this.academicYearService.createAcademicYear({
      createAcademicYearDto,
      user,
    });
  }

  @Get()
  async findAll(@CurrentUser() user: IAuthPayload) {
    console.log({ id: user });
    return this.academicYearService.getAcademicYears({ user });
  }

  @Get('active')
  async findActive(@CurrentUser() user: IAuthPayload) {
    return this.academicYearService.getActiveAcademicYear({ user });
  }

  @Patch(':id/activate')
  async activate(@Param('id') id: string, @CurrentUser() user: IAuthPayload) {
    console.log({ id, user });
    return this.academicYearService.activateAcademicYear({ id, user });
  }

  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: string) {
    return this.academicYearService.deactivateAcademicYear(id);
  }
}
