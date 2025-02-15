import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @Request() req,
  ) {
    return this.profileService.createProfile(req.user.id, createProfileDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.profileService.getProfileByUserId(req.user.id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Body() createProfileDto: CreateProfileDto,
    @Request() req,
  ) {
    return this.profileService.updateProfile(req.user.id, createProfileDto);
  }
}
