import { Model } from '@nozbe/watermelondb'
import { field, date, text, lazy } from '@nozbe/watermelondb/decorators'

export default class Activity extends Model {

  static table = 'activities'

  @text('title') title
  @text('description') description
  @field('number') number
  @date('made_at') madeAt
  @date('created_at') createdAt
  @date('updated_at') updatedAt

  static associations = {
    activity_tags: { type: 'has_many', foreignKey: 'activity_id' },
  }

  @lazy
  tags = this.collections
    .get('tags')
    .query(Q.on('activity_tags', 'activity_id', this.id));

}