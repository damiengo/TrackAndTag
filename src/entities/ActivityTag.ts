import {
  Entity,
  Column,
  PrimaryGeneratedColumn, 
  ManyToOne, 
  Index, 
  Unique
} from 'typeorm';

import { Activity } from './Activity'
import { Tag } from './Tag'

@Entity('activity_tag')
@Unique(['activity', 'tag'])
export class ActivityTag {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  @Index()
  order: number | null

  @Column()
  createdAt: number

  @Column({ nullable: true })
  updatedAt: number | null

  @ManyToOne(/* istanbul ignore next */() => Activity, /* istanbul ignore next */activity => activity.activityTags)
  activity: Activity;

  @ManyToOne(/* istanbul ignore next */() => Tag, /* istanbul ignore next */tag => tag.activityTags)
  tag: Tag;

}