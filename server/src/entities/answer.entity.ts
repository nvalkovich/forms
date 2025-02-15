import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Form } from './form.entity';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Form, { onDelete: 'CASCADE' })
  form: Form;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  question: Question;

  @Column({ type: 'text' })
  value: string;
}
