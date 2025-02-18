import { IsString, IsEnum, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { QuestionType } from '../entities/question.entity'; // Импортируем enum

export class CreateQuestionDto {
  @IsString()
  title: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsOptional()
  @IsArray()
  options?: { value: string }[];

  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @IsOptional()
  @IsBoolean()
  showInResults?: boolean;
}