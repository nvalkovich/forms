import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Template } from './entities/template.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { User } from 'src/user/entities/user.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,

    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  async create(
    createTemplateDto: CreateTemplateDto,
    user: User,
  ): Promise<Template> {
    const { title, description, image, isPublic, topicId, tags, questions } =
      createTemplateDto;

    const topicData = await this.topicRepository.findOne({
      where: { id: topicId },
    });
    if (!topicData) {
      throw new NotFoundException('Topic not found');
    }

    const existingTags = await this.tagRepository.find({
      where: { name: In(tags) },
    });

    const newTags = tags
      .filter((tagName) => !existingTags.some((tag) => tag.name === tagName))
      .map((tagName) => ({ name: tagName }));

    const savedNewTags = await this.tagRepository.save(newTags);

    const allTags = [...existingTags, ...savedNewTags];

    const template = this.templateRepository.create({
      title,
      description,
      image,
      isPublic,
      author: user,
      topic: topicData,
      tags: allTags,
      questions: questions?.map((questionDto) => ({
        title: questionDto.title,
        type: questionDto.type,
        options: questionDto.options,
        required: questionDto.required,
        showInResults: questionDto.showInResults,
      })),
    });

    return this.templateRepository.save(template);
  }

  async findAll(): Promise<Template[]> {
    return this.templateRepository.find({
      relations: ['author', 'topic'],
    });
  }

  async findOne(id: string, user?: User): Promise<Template> {
    const template = await this.templateRepository.findOne({
      where: { id },
      relations: ['questions', 'author', 'topic', 'tags'],
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    if (
      !template.isPublic &&
      (!user || (user.id !== template.author.id && !user.isAdmin))
    ) {
      throw new ForbiddenException('Access denied');
    }

    return template;
  }

  async update(
    id: string,
    updateTemplateDto: UpdateTemplateDto,
    user: User,
  ): Promise<Template> {
    const template = await this.findOne(id, user);

    if (user.id !== template.author.id && !user.isAdmin) {
      throw new ForbiddenException(
        'You do not have permission to update this template',
      );
    }

    Object.assign(template, updateTemplateDto);

    return this.templateRepository.save(template);
  }

  async remove(id: string, user: User): Promise<void> {
    const template = await this.findOne(id, user);

    if (user.id !== template.author.id && !user.isAdmin) {
      throw new ForbiddenException(
        'You do not have permission to delete this template',
      );
    }

    await this.templateRepository.remove(template);
  }
}
