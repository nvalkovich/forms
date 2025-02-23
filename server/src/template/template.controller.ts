import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/guards/jwt-auth.guard';
import { Routes } from 'src/types/types';

@Controller(Routes.templates)
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createTemplateDto: CreateTemplateDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.templateService.create(createTemplateDto, req.user);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    return this.templateService.findAll(req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.templateService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTemplateDto: UpdateTemplateDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.templateService.update(id, updateTemplateDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.templateService.remove(id, req.user);
  }
}
