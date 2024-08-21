import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: PaginateModel<User>) {}

  async create(createUserDto: CreateUserDto) {
    return await this.UserModel.create(createUserDto);
  }

  async findOne(email: string) {
    return await this.UserModel.findOne({ email }).lean();
  }

  async findAndPopulateUser(email: string) {
    return await this.UserModel.findOne({ email }).populate('account').lean();
  }

  // For Super Super Admin
  async findAll() {
    return await this.UserModel.paginate();
  }

  async findById(id: string) {
    return await this.UserModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.UserModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.UserModel.findByIdAndDelete(id);
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (e) {
      // console.log(e);
      throw new UnauthorizedException("You're not authorized");
    }
  }

  async comparePassword(password1: string, password2): Promise<string> {
    try {
      return await bcrypt.compare(password1, password2);
    } catch (e) {
      // console.log(e);
      throw new UnauthorizedException("You're not authorized");
    }
  }
}
