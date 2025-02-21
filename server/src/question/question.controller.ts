import { Controller, Get } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getAllTopics(): Promise<Question[]> {
    return this.questionService.getAllQuestions();
  }
}
