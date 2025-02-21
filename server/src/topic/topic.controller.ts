import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TopicService } from './topic.service';
import { Topic } from './entities/topic.entity';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  async getAllTopics(): Promise<Topic[]> {
    return this.topicService.getAllTopics();
  }

  @Get(':id')
  async getTopic(@Param('id') id: string): Promise<Topic | null> {
    return await this.topicService.findOne(id);
  }

  @Delete(':id')
  async deleteTopic(@Param('id') id: string) {
    return await this.topicService.delete(id);
  }

  @Post()
  async createTopic(@Body('title') title: string): Promise<Topic> {
    return this.topicService.createTopic(title);
  }
}
