import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, 
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { password: userPassword, ...other } = createUserDto;
    const password = await this.hashPassword(userPassword)
    return await this.usersService.create({ ...other, password });
  }

  async login(createAuthDto: CreateAuthDto, response: Response) {
    const user = await this.usersService.findOne(createAuthDto.email);

    if (!user) {
      throw new BadRequestException('User does not exist')
    }
    const { password, ...result } = user;

    await this.comparePassword(password, createAuthDto.password)

    const payload = { sub: user._id, role: user.role, email: user.email };

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + 360000);

    const token = this.jwtService.sign(payload);

    return response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
      path: '/',
    });

    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
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
