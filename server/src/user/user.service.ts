import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { errorMessageKeys } from 'src/types/types';
import { pgSQLDuplicateKeyErrorCode, passwordSaltRounds } from 'src/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt(passwordSaltRounds);
      const password = await bcrypt.hash(createUserDto.password, salt);
      const user = this.userRepo.create({
        email: createUserDto.email,
        name: createUserDto.name,
        password,
      });

      await this.userRepo.save(user);

      const token = this.jwtService.sign({ email: createUserDto.email });
      return { user, token };
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError.code === pgSQLDuplicateKeyErrorCode
      ) {
        throw new HttpException(
          { message: errorMessageKeys.userExists },
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        { message: errorMessageKeys.internalServerError },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(email: string) {
    return await this.userRepo.findOne({ where: { email: email } });
  }

  async findById(id: string) {
    return await this.userRepo.findOne({ where: { id } });
  }
}
