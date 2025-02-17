import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HealthController } from './health.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TemplateModule } from './template/template.module';
import { TopicModule } from './topic/topic.module';
import { QuestionModule } from './question/question.module';
import { TemplateService } from './template/template.service';
import { Template } from './template/entities/template.entity';
import { Topic } from './topic/entities/topic.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TypeOrmModule.forFeature([User, Template, Topic]),
    AuthModule,
    UserModule,
    TemplateModule,
    TopicModule,
    QuestionModule,
  ],
  controllers: [HealthController, AppController, UserController],
  providers: [AppService, UserService, TemplateService],
})
export class AppModule {}
