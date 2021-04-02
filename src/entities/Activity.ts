import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany, 
  JoinTable,
  OneToMany, 
  Index
} from 'typeorm';

import { ActivityTag } from './ActivityTag'
import { Tag } from './Tag'

@Entity('activity')
export class Activity {

  @PrimaryGeneratedColumn() 
  id: number

  @Column('text') 
  title: string

  @Column('text', { nullable: true })
  description: string | undefined

  @Column('real')
  @Index()
  quantity: number

  @Column()
  @Index()
  madeAt: number

  @Column()
  @Index()
  createdAt: number

  @Column({ nullable: true })
  @Index()
  updatedAt: number | undefined

  @OneToMany(/* istanbul ignore next */() => ActivityTag, 
             /* istanbul ignore next */activityTag => activityTag.activity)
  activityTags: ActivityTag[]

  tagsLabels: string

  getTags = () : Tag[] => this.activityTags.map((at: ActivityTag) => at.tag)
  getTagsLabels = () : string[] => this.getTags().map((tag: Tag) => tag.label)

  addTags = (tags: Tag[]) => tags.map((tag: Tag) => {
    const at = new ActivityTag()
    at.activity = this
    at.tag = tag
    if(this.activityTags == null) {
      this.activityTags = []
    }
    this.activityTags.push(at)
  })

}