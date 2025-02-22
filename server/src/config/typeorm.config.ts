import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from 'src/user/entities/user.entity';
import { Template } from 'src/template/entities/template.entity';
import { Question } from 'src/question/entities/question.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { Initial1740274162586 } from 'src/migrations/1740274162586-Initial';
config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: configService.get<string>('DATABASE_URL'), 
  synchronize: false,
  migrations: [Initial1740274162586],
  migrationsRun: true,
  entities: [User, Template, Question, Tag, Topic],
  logging: true,
});

export default AppDataSource;