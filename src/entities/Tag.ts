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
  @Column('text') description: string;
  @Column() unit: number;
  @Column() createdAt: number;
  @Column() updatedAt: number;

  @ManyToMany(() => Activity, activity => activity.tags)
  @JoinTable()
  activities: Activity[];

}