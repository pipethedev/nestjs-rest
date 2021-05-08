import { AuthService } from './auth.service';

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthLoginDto } from './dto/LoginDto';
import { JwtAuthGuard } from './ jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'Success!';
  }
}
