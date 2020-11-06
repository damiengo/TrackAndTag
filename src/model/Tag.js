import { Model } from '@nozbe/watermelondb'
import { field, date, text, lazy } from '@nozbe/watermelondb/decorators'

export default class Tag extends Model {

  static table = 'tags'

  @text('label') label
  @text('description') description
  @field('unit') unit
  @date('created_at') createdAt
  @date('updated_at') updatedAt

  static associations = {
    activity_tags: { type: 'has_many', foreignKey: 'tag_id' },
  }

  @lazy
  activities = this.collections
    .get('activities')
    .query(Q.on('activity_tags', 'tag_id', this.id));

}