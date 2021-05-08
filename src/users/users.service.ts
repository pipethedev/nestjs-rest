import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/CreateUserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const salt = await bcrypt.genSalt(10);
      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
      const newItem = new this.userModel(createUserDto);
      return await newItem.save();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async showById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    delete user.password;
    return user;
  }

  async findByEmail(email?: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async validatePassword(password: string): Promise<boolean> {
    try {
      const response = this.findByEmail();
      return bcrypt.compare(password, (await response).password);
    } catch (e) {
      return false;
    }
  }
}
