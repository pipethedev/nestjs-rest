import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get(':email')
  async all(@Param('email') email: string): Promise<User> {
    return await this.usersService.findByEmail(email);
  }

  @Get(':id')
  show(@Param('id') id: string): Promise<User> {
    return this.usersService.showById(id);
  }
}
