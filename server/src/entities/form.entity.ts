import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Template } from './template.entity';

@Entity()
export class Form {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Template, { onDelete: 'CASCADE' })
  template: Template;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
