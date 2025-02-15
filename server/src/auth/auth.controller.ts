import {
  Controller,
  Post,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Routes } from 'src/types/types';

@Controller(Routes.auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(Routes.register)
  @UsePipes(new ValidationPipe())
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post(Routes.login)
  @UsePipes(new ValidationPipe())
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return this.authService.login(req.user);
  }
}
