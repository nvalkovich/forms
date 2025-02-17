import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { Question } from 'src/question/entities/question.entity';

@Entity()
export class Template {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.templates, { onDelete: 'CASCADE' })
  author: User;

  @ManyToMany(() => User, (user) => user.usedTemplates)
  users: User[];

  @ManyToMany(() => Topic, (topic) => topic.templates)
  topics: Topic[];

  @OneToMany(() => Question, (question) => question.template)
  questions: Question[];
}
