import { UnauthorizedException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserData } from 'src/types/types';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { errorMessageKeys } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    throw new UnauthorizedException(errorMessageKeys.invalidCredentials);
  }

  login(user: UserData) {
    const { id, email } = user;
    return {
      user,
      token: this.jwtService.sign({ id, email }),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const { user } = await this.userService.create(createUserDto);
    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return { user, token };
  }
}
