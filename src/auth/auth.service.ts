import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './dto/LoginDto';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto): Promise<any> {
    const user = await this.validateUser(authLoginDto);
    return {
      access_token: this.jwtService.sign(user),
    };
  }
  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { email, password } = authLoginDto;
    const user = await this.usersService.findByEmail(email);
    if ((await this.usersService.validatePassword(password)) == false) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return user;
  }
}
