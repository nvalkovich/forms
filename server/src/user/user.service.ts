import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { PG_SQL_DUPLICATE_KEY_ERROR_CODE } from 'src/constants';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'src/utils/bcrypt';
import { UserRelations } from './entities/user.entity';
import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessageKeys } from 'src/types/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const password = await hash(createUserDto.password);

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
        error.driverError.code === PG_SQL_DUPLICATE_KEY_ERROR_CODE
      ) {
        throw new ConflictException(ErrorMessageKeys.userExists);
      }

      throw new InternalServerErrorException({
        message: ErrorMessageKeys.internalServerError,
      });
    }
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email: email },
      relations: [UserRelations.templates, UserRelations.usedTemplates],
    });

    return user;
  }

  async findAll() {
    const users = await this.userRepo.find({
      relations: [UserRelations.templates, UserRelations.usedTemplates],
    });

    return users;
  }

  async findById(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: [
        UserRelations.templates,
        UserRelations.templatesTags,
        UserRelations.templatesTopic,
        UserRelations.templatesQuestions,
        UserRelations.templatesUsers,
        UserRelations.usedTemplates,
      ],
    });

    if (user) {
      return user;
    }

    throw new NotFoundException({ message: ErrorMessageKeys.userNotFound });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findById(id);

      if (updateUserDto.isBlocked !== undefined) {
        user.isBlocked = updateUserDto.isBlocked;
      }
      if (updateUserDto.isAdmin !== undefined) {
        user.isAdmin = updateUserDto.isAdmin;
      }

      await this.userRepo.save(user);
      return user;
    } catch {
      throw new InternalServerErrorException({
        message: ErrorMessageKeys.internalServerError,
      });
    }
  }

  async delete(id: string) {
    try {
      const user = await this.findById(id);

      await this.userRepo.remove(user);
    } catch {
      throw new InternalServerErrorException({
        message: ErrorMessageKeys.internalServerError,
      });
    }
  }
}
