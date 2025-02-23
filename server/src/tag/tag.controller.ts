import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from './entities/tag.entity';
import { Routes } from 'src/types/types';

@Controller(Routes.tags)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getTags(@Query('search') search?: string): Promise<Tag[]> {
    if (search) {
      return this.tagService.searchTags(search);
    }
    return this.tagService.findAll();
  }

  @Post()
  async add(@Body() body: { name: string }): Promise<Tag> {
    return this.tagService.addTag(body.name);
  }
}
