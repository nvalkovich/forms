import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './entities/topic.entity';
import { Template } from 'src/template/entities/template.entity';

@Injectable()
export class TopicService implements OnModuleInit {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
  ) {}

  async onModuleInit() {
    const tableExists = await this.checkTableExists('topic');
    if (tableExists) {
      await this.addInitialTopics();
    } else {
      console.warn('Table "topic" does not exist. Skipping initial data insertion.');
    }
  }

  async checkTableExists(tableName: string): Promise<boolean> {
    const query = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = $1
      )
    `;
    const result = await this.topicRepository.query(query, [tableName]);
    return result[0].exists; // Вернет true, если таблица существует
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

  async delete(id: string) {
    const topic = await this.topicRepository.findOne({
      where: { id },
      relations: ['templates'],
    });

    if (!topic) {
      throw new HttpException('Topic not found', HttpStatus.NOT_FOUND);
    }

    if (topic.templates.length > 0) {
      await this.templateRepository.remove(topic.templates);
    }

    return await this.topicRepository.remove(topic);
  }

  private async addInitialTopics(): Promise<void> {
    const topics = ['education', 'test', 'other'];

    for (const title of topics) {
      const existingTopic = await this.topicRepository.findOne({
        where: { title },
      });
      if (!existingTopic) {
        const topic = this.topicRepository.create({ title });
        await this.topicRepository.save(topic);
      }
    }
  }
}