import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { SchoolsService } from 'src/schools/schools.service';
import { AccountTypeEnum } from 'src/shared/interfaces/schema.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly schoolsService: SchoolsService,
    private jwtService: JwtService,
  ) {}

  async register(createAccountDto: CreateAuthDto) {
    const { password: userPassword, ...other } = createAccountDto;
    const user = await this.usersService.findOne(other.email);

    if (user && user.email) {
      throw new BadRequestException('Email Already in use');
    }

    const password = await this.hashPassword(userPassword);
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

    newUser.account = school._id;
    await newUser.save();

    return newUser;
  }

  async login(loginDto: LoginDto, response: Response) {
    const { password, ...user } = await this.usersService.findOne(
      loginDto.email,
    );

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    await this.comparePassword(password, loginDto.password);

    const payload = { sub: user._id, role: user.role, email: user.email };

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
      access_token: token,
    };
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException("You're not authorized");
    }
  }

  async comparePassword(password1: string, password2): Promise<string> {
    try {
      return await bcrypt.compare(password1, password2);
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException("You're not authorized");
    }
  }
}
