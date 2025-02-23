import { Controller, Get } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { Routes } from 'src/types/types';

@Controller(Routes.questions)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getAllTopics(): Promise<Question[]> {
    return this.questionService.getAllQuestions();
  }
}
