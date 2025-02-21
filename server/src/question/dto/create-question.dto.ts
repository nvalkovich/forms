import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { QuestionType } from '../entities/question.entity';
export class CreateQuestionDto {
  @IsString()
  title: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsOptional()
  @IsString()
  description?: string;

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
