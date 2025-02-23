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
import { ErrorMessageKeys } from 'src/types/types';
import { TempateRelations } from './entities/template.entity';

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

  async getTopicData(id: string) {
    const topicData = await this.topicRepository.findOne({
      where: { id },
    });

    if (topicData) {
      return topicData;
    }

    throw new NotFoundException({ message: ErrorMessageKeys.topicNotFound });
  }

  async findTags(tags: string[]) {
    const foundTags = await this.tagRepository.find({
      where: { id: In(tags) },
    });

    if (foundTags.length !== tags.length) {
      throw new NotFoundException({ message: ErrorMessageKeys.tagsNotFound });
    }

    return foundTags;
  }

  async findUsers(users: string[]) {
    const foundUsers = users.length
      ? await this.userRepository.find({ where: { id: In(users) } })
      : [];

    if (foundUsers) {
      return foundUsers;
    }

    throw new NotFoundException({ message: ErrorMessageKeys.usersNotFound });
  }

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

    const topicData = await this.getTopicData(topicId);
    const foundTags = await this.findTags(tags);
    const foundUsers = await this.findUsers(users);

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
      const questionsToSave = questions.map((questionDto) =>
        this.questionRepository.create({
          ...questionDto,
          template: savedTemplate,
        }),
      );
      const createdQuestions =
        await this.questionRepository.save(questionsToSave);

      savedTemplate.questions = createdQuestions;
      return this.templateRepository.save(savedTemplate);
    }

    return savedTemplate;
  }

  async findAll(): Promise<Template[]> {
    return this.templateRepository.find({
      relations: [
        TempateRelations.questions,
        TempateRelations.author,
        TempateRelations.topic,
        TempateRelations.tags,
        TempateRelations.users,
      ],
    });
  }

  checkAccess(user: User, template: Template) {
    if (user.id !== template.author.id && !user.isAdmin) {
      throw new ForbiddenException({ message: ErrorMessageKeys.accessDenied });
    }
  }

  async findOne(id: string, user?: User): Promise<Template> {
    const template = await this.templateRepository.findOne({
      where: { id },
      relations: [
        TempateRelations.questions,
        TempateRelations.author,
        TempateRelations.topic,
        TempateRelations.tags,
        TempateRelations.users,
      ],
    });

    if (!template) {
      throw new NotFoundException({
        message: ErrorMessageKeys.templateNotFound,
      });
    }

    if (!template.isPublic && user) {
      this.checkAccess(user, template);
    }

    return template;
  }

  async update(
    id: string,
    updateTemplateDto: UpdateTemplateDto,
    user: User,
  ): Promise<Template> {
    const template = await this.findOne(id, user);

    this.checkAccess(user, template);

    Object.assign(template, updateTemplateDto);

    return this.templateRepository.save(template);
  }

  async remove(id: string, user: User): Promise<void> {
    const template = await this.findOne(id, user);

    this.checkAccess(user, template);

    await this.templateRepository.remove(template);
  }
}
