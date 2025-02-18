import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicService implements OnModuleInit {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  async onModuleInit() {
    await this.addInitialTopics();
  }

  async getAllTopics(): Promise<Topic[]> {
    return this.topicRepository.find();
  }

  async createTopic(title: string): Promise<Topic> {
    const topic = this.topicRepository.create({ title });
    return this.topicRepository.save(topic);
  }


  async findOne(id: string) {
    return await this.topicRepository.findOne({ where: { id } });
  }
  

  private async addInitialTopics(): Promise<void> {
    const topics = ['education', 'test', 'other'];

    for (const title of topics) {
      const existingTopic = await this.topicRepository.findOne({ where: { title } });
      if (!existingTopic) {
        const topic = this.topicRepository.create({ title });
        await this.topicRepository.save(topic);
      }
    }
  }
}
