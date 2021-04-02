import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany, 
  Unique
} from 'typeorm';

import { ActivityTag } from './ActivityTag'

@Entity('tag')
@Unique(['label'])
export class Tag {

  @PrimaryGeneratedColumn() id: number

  @Column('text')
  label: string

  @Column('text', { nullable: true })
  description: string | null

  @Column({ nullable: true })
  unit: number | undefined

  @Column()
  createdAt: number

  @Column({ nullable: true })
  updatedAt: number

  @OneToMany(/* istanbul ignore next */() => ActivityTag, /* istanbul ignore next */activityTag => activityTag.tag)
  activityTags: ActivityTag[]

  activities = () => this.activityTags.map((at: ActivityTag) => at.activity)

}