import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from 'src/user/entities/user.entity';
import { Template } from 'src/template/entities/template.entity';
import { Question } from 'src/question/entities/question.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { Initial1740274162586 } from 'src/migrations/1740274162586-Initial';
import { AddSalesforceAccountIdColumnToUserEntity1741031903219 } from 'src/migrations/1741031903219-AddSalesforceAccountIdColumnToUserEntity';
import { EnvVariables, NodeEnv } from 'src/types/types';
import { DATABASE_TYPE } from 'src/constants';

config();

const configService = new ConfigService();

export const getTypeOrmConfig = (
  configService: ConfigService,
): DataSourceOptions => {
  const isProd =
    configService.get<string>(EnvVariables.nodeEnv) === NodeEnv.prod;

  return {
    type: DATABASE_TYPE,
    url: configService.get<string>(EnvVariables.databaseUrl),
    synchronize: true,
    migrations: [
      Initial1740274162586,
      AddSalesforceAccountIdColumnToUserEntity1741031903219,
    ],
    migrationsRun: isProd,
    entities: [User, Template, Question, Tag, Topic],
    logging: isProd,
  };
};

export const AppDataSource = new DataSource(getTypeOrmConfig(configService));
