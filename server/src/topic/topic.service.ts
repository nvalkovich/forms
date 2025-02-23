import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './entities/topic.entity';
import { Template } from 'src/template/entities/template.entity';
import { ErrorMessageKeys } from 'src/types/types';
import { TopicRelations } from './entities/topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
  ) {}

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

  async delete(id: string) {
    const topic = await this.topicRepository.findOne({
      where: { id },
      relations: [TopicRelations.templates],
    });

    if (!topic) {
      throw new NotFoundException({ message: ErrorMessageKeys.topicNotFound });
    }

    if (topic.templates.length > 0) {
      await this.templateRepository.remove(topic.templates);
    }

    return await this.topicRepository.remove(topic);
  }
}
