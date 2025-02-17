import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { Template } from './entities/template.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { Question } from 'src/question/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Template, Topic, Question])],
  providers: [TemplateService],
    controllers: [TemplateController],
  exports: [TemplateService],  
})
export class TemplateModule {}
