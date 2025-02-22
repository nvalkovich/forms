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
import { Question } from 'src/question/entities/question.entity';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,

    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(
    createTemplateDto: CreateTemplateDto,
    user: User,
  ): Promise<Template> {
    const {
      title,
      description,
      image,
      isPublic,
      topicId,
      tags,
      users,
      questions,
    } = createTemplateDto;

    const topicData = await this.topicRepository.findOne({
      where: { id: topicId },
    });
    if (!topicData) throw new NotFoundException('Topic not found');

    const foundTags = await this.tagRepository.find({
      where: { id: In(tags) },
    });
    if (foundTags.length !== tags.length) {
      throw new NotFoundException('One or more tags not found');
    }

    const foundUsers = users.length
      ? await this.userRepository.find({ where: { id: In(users) } })
      : [];

    const template = this.templateRepository.create({
      title,
      description,
      image,
      isPublic,
      author: user,
      topic: topicData,
      tags: foundTags,
      users: foundUsers,
    });

    const savedTemplate = await this.templateRepository.save(template);

    if (questions?.length) {
      const createdQuestions = await this.questionRepository.save(
        questions.map((questionDto) =>
          this.questionRepository.create({
            ...questionDto,
            template: savedTemplate,
          }),
        ),
      );
      savedTemplate.questions = createdQuestions;
      return this.templateRepository.save(savedTemplate);
    }

    return savedTemplate;
  }

  async findAll(): Promise<Template[]> {
    return this.templateRepository.find({
      relations: ['questions', 'author', 'topic', 'tags', 'users'],
    });
  }

  async findOne(id: string, user?: User): Promise<Template> {
    const template = await this.templateRepository.findOne({
      where: { id },
      relations: ['questions', 'author', 'topic', 'tags', 'users'],
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    if (
      !template.isPublic &&
      user &&
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
