import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';
import { Template } from 'src/template/entities/template.entity';

enum QuestionType {
  singleLineString = 'singleLineString',
  multiLineString = 'multiLineString',
  positiveInteger = 'positiveInteger',
  checkbox = 'checkbox',
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  wording: string;

  @Column({
    type: 'enum',
    enum: QuestionType
  })
  type: QuestionType;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => Template, (template) => template.questions, { onDelete: 'CASCADE' })
  template: Template;
}
