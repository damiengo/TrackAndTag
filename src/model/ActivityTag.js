import { Model } from '@nozbe/watermelondb'
import { field, date } from '@nozbe/watermelondb/decorators'

export default class ActivityTag extends Model {

  static table = 'activity_tags'

  @field('activity_id') activityId
  @date('tag_id') tagId

  static associations = {
    activities: { type: 'belongs_to', foreignKey: 'activity_id' },
    tags:       { type: 'belongs_to', foreignKey: 'tag_id' },
  }

}