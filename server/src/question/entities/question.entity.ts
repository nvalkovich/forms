import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Template } from 'src/template/entities/template.entity';

export enum QuestionType {
  singleLineString = 'singleLineString',
  multiLineString = 'multiLineString',
  positiveInteger = 'positiveInteger',
  checkbox = 'checkbox',
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  type: QuestionType;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => Template, (template) => template.questions, {
    onDelete: 'CASCADE',
  })
  template: Template;

  @Column({ default: false })
  required: boolean;

  @Column({ default: false })
  showInResults: boolean;

  @Column('json', { nullable: true })
  options?: { value: string }[];
}
