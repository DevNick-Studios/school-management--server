import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { SchoolsService } from 'src/schools/schools.service';
import {
  AccountTypeEnum,
  IAuthPayload,
  ISchool,
  ITeacher,
} from 'src/shared/interfaces/schema.interface';
import { AcademicYearService } from 'src/academic-year/academic-year.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly schoolsService: SchoolsService,
    private readonly academicYearService: AcademicYearService,
    private jwtService: JwtService,
  ) {}

  async register(createAccountDto: CreateAuthDto) {
    const { password: userPassword, ...other } = createAccountDto;
    const user = await this.usersService.findOne(other.email);

    if (user && user.email) {
      throw new BadRequestException('Email Already in use');
    }

    const password = await this.usersService.hashPassword(userPassword);
    const newUser = await this.usersService.create({
      ...other,
      password,
      role: AccountTypeEnum.school,
    });

    const school = await this.schoolsService.create({
      ...createAccountDto,
      name: createAccountDto.schoolName,
      owner: newUser._id,
    });

    //   const academicYear =
    // await this.academicYearService.getActiveAcademicYearBySchoolId({
    //   school: payload.school,
    // });

    newUser.account = school._id;
    await newUser.save();

    return newUser;
  }

  async login(loginDto: LoginDto, response: Response) {
    const foundUser = await this.usersService.findAndPopulateUser(
      loginDto.email,
    );

    if (!foundUser) {
      throw new BadRequestException('User does not exist');
    }

    const { password, ...user } = foundUser;

    await this.usersService.comparePassword(password, loginDto.password);

    const payload: IAuthPayload = {
      id: user._id,
      role: user.role,
      email: user.email,
      school: '',
      accountId: '',
      academicYear: '',
    };

    if (foundUser.role === 'Teacher') {
      payload.school = (foundUser.account as ITeacher).school.toString();
      payload.accountId = (foundUser.account as ITeacher)._id;
    } else {
      payload.school = (foundUser.account as ISchool)._id;
      payload.accountId = (foundUser.account as ISchool)._id;
    }

    const academicYear =
      await this.academicYearService.getActiveAcademicYearBySchoolId({
        school: payload.school,
      });

    payload.academicYear = academicYear._id?.toString();

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + 360000);

    const token = this.jwtService.sign(payload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
      path: '/',
    });

    return {
      ...user,
      ...payload,
      school: payload.school,
      academicYear: payload.academicYear,
      accessToken: token,
    };
  }
}
