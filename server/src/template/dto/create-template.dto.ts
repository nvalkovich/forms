import { IsString, IsOptional, IsBoolean, IsArray, IsUUID } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsBoolean()
  isPublic: boolean;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  topicIds?: string[];
}
