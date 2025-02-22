import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { errorMessageKeys } from 'src/types/types';
import { pgSQLDuplicateKeyErrorCode, passwordSaltRounds } from 'src/constants';
import { UpdateUserDto } from './dto/update-user.dto';

const getUserWithoutPassword = (user: User) => {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => key !== 'password'),
  );
};

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
    const user = await this.userRepo.findOne({
      where: { email: email },
      relations: ['templates', 'usedTemplates'],
    });
    return user;
  }

  async findAll() {
    const users = await this.userRepo.find({
      relations: ['templates', 'usedTemplates'],
    });
    return users.map((user) => getUserWithoutPassword(user));
  }

  async findById(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: [
        'templates',
        'templates.tags',
        'templates.topic',
        'templates.questions',
        'templates.users',
        'usedTemplates',
      ],
    });
    if (!user) {
      return;
    }
    return getUserWithoutPassword(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (updateUserDto.isBlocked !== undefined) {
        user.isBlocked = updateUserDto.isBlocked;
      }
      if (updateUserDto.isAdmin !== undefined) {
        user.isAdmin = updateUserDto.isAdmin;
      }

      await this.userRepo.save(user);
      return user;
    } catch {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string) {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      await this.userRepo.remove(user);
      return { message: 'User deleted successfully' };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
