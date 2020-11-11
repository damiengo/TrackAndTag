import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany, 
  JoinTable,
} from 'typeorm';

import { Tag } from './Tag'

@Entity('activity')
export class Activity {

  @PrimaryGeneratedColumn() id: number;
  @Column('text') title: string;
  @Column('text', { nullable: true }) description: string | null;
  @Column() quantity: number;
  @Column() madeAt: number;
  @Column() createdAt: number;
  @Column({ nullable: true }) updatedAt: number | null;

  @ManyToMany(() => Tag, (tag) => tag.activities)
  @JoinTable()
  tags: Tag[];

}