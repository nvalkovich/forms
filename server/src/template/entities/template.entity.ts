import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Topic } from '../../topic/entities/topic.entity';
import { Question } from '../../question/entities/question.entity';
import { Tag } from '../../tag/entities/tag.entity';

@Entity()
export class Template {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'boolean', default: false })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.templates, { onDelete: 'CASCADE' })
  author: User;

  @ManyToMany(() => User, (user) => user.usedTemplates, { cascade: true })
  @JoinTable()
  users: User[];

  @ManyToOne(() => Topic, (topic) => topic.templates)
  topic: Topic;

  @ManyToMany(() => Tag, (tag) => tag.templates, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Question, (question) => question.template, { cascade: true })
  questions: Question[];
}

export enum TempateRelations {
  questions = 'questions',
  author = 'author',
  topic = 'topic',
  tags = 'tags',
  users = 'users',
}
