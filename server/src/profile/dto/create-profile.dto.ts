import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  bio: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
