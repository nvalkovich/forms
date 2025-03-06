import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { Template } from '../../template/entities/template.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isBlocked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Template, (template) => template.author, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  templates: Template[];

  @Column({ nullable: true, type: 'varchar' })
  salesforceAccountId: string | null;

  @Column({ nullable: true, type: 'varchar' })
  jiraAccountId: string | null;

  @ManyToMany(() => Template, (template) => template.users)
  usedTemplates: Template[];
}

export enum UserRelations {
  templates = 'templates',
  templatesTags = 'templates.tags',
  templatesTopic = 'templates.topic',
  templatesQuestions = 'templates.questions',
  templatesUsers = 'templates.users',
  usedTemplates = 'usedTemplates',
}
