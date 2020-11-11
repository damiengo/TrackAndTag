import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany, 
  JoinTable,
} from 'typeorm';

import { Activity } from './Activity'

@Entity('tag')
export class Tag {

  @PrimaryGeneratedColumn() id: number;
  @Column('text') label: string;
  @Column('text', { nullable: true }) description: string | null;
  @Column({ nullable: true }) unit: number | undefined;
  @Column() createdAt: number;
  @Column() updatedAt: number;

  @ManyToMany(() => Activity, activity => activity.tags)
  @JoinTable()
  activities: Activity[];

}