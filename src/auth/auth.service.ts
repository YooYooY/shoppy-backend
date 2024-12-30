import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.userService.getUser({ email });
      const authenticated = await bcrypt.compare(password, user.password);
      if(!authenticated) {
        throw new UnauthorizedException('Credentials are not valid.')
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Credentials are not valid.')
    }
  }
}
