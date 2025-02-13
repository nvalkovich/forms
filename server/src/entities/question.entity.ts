import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Template } from './template.entity';

export enum QuestionType {
  SHORT_TEXT = 'shortText',
  LONG_TEXT = 'longText',
  INTEGER = 'integer',
  CHECKBOX = 'checkbox',
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Template, { onDelete: 'CASCADE' })
  template: Template;

  @Column({ type: 'enum', enum: QuestionType })
  type: QuestionType;

  @Column()
  title: string;

  @Column()
  order: number;
}
