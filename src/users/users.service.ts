import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    return await this.UserModel.create(createUserDto);
  }

  // For Super Super Admin
  async findAll() {
    return await this.UserModel.find();
  }

  async findOne(id: string) {
    return await this.UserModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.UserModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.UserModel.findByIdAndDelete(id);
  }
}
