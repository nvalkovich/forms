import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Template } from '../../template/entities/template.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Template, (template) => template.tags)
  templates: Template[];
}

export enum TagRelations {
  templates = 'templates'
}