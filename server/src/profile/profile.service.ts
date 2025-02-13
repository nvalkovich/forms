import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { errorMessages } from 'src/types/types';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    private userService: UserService,
  ) {}

  async createProfile(userId: string, createProfileDto: CreateProfileDto) {
    const user: User | null = await this.userService.findById(userId);

    if (!user) {
      throw new HttpException(errorMessages.userNotFound, HttpStatus.NOT_FOUND);
    }

    const profile = this.profileRepo.create({
      ...createProfileDto,
      user,
    });

    return await this.profileRepo.save(profile);
  }

  async getProfileByUserId(userId: string) {
    const profile = await this.profileRepo.findOne({
      where: { user: { id: userId } },
    });
    console.log(profile);
    return profile;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new HttpException(errorMessages.userNotFound, HttpStatus.NOT_FOUND);
    }
    await this.profileRepo.update({ user: { id: userId } }, updateProfileDto);
    return this.getProfileByUserId(userId);
  }
}
