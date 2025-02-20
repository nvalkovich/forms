import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { Template } from 'src/template/entities/template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, Template])],
  providers: [TopicService],
  controllers: [TopicController],
  exports: [TopicService],
})
export class TopicModule {}
