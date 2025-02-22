import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Template } from '../../template/entities/template.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Template, (template) => template.topic, {
    cascade: ['remove'],
  })
  templates: Template[];
}
