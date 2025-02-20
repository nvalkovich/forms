import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async searchTags(query: string): Promise<Tag[]> {
    return this.tagRepository
      .createQueryBuilder('tag')
      .where('tag.name LIKE :query', { query: `${query}%` })
      .getMany();
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async addTag(newTag: string): Promise<Tag> {
    const existingTag = await this.tagRepository.findOneBy({ name: newTag });

    if (existingTag) {
      return existingTag;
    }

    const tag = this.tagRepository.create({ name: newTag });
    return await this.tagRepository.save(tag);
  }
}
