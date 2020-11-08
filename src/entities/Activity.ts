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
  @Column('text') description: string;
  @Column() number: number;
  @Column() madeAt: number;
  @Column() createdAt: number;
  @Column() updatedAt: number;

  @ManyToMany(() => Tag, (tag) => tag.activities)
  @JoinTable()
  tags: Tag[];

}