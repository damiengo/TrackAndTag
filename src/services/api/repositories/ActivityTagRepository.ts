import database from '../Database'
import { Activity } from '../../../entities/Activity'
import { Tag } from '../../../entities/Tag'
import { ActivityTag } from '../../../entities/ActivityTag'

export default class ActivityTagRepository {

    deleteForActivity = async(activity: Activity) => {
        const labels = activity.getTagsLabels().map(l => "'"+l+"'").join(',')
        await database.query(`DELETE FROM "activity_tag"
            WHERE "tagId" NOT IN (
                SELECT "id"
                FROM "tag"
                WHERE "label" IN (${labels})
            )
            AND "activityId" = $1
        `, [ activity.id ], true)
    }

    updateForActivity = async(activity: Activity) => {
        const labels = activity.getTagsLabels().map(l => "'"+l+"'").join(',')
        const res = await database.query(`UPDATE "activity_tag"
            SET "updatedAt" = $1
            WHERE "activityId" = $2
            AND "tagId" IN (
                SELECT "id"
                FROM "tag"
                WHERE "label" IN (${labels})
            )
        `, [ Date.now(), activity.id ], true)
    }

    addForActivity = async(activity: Activity) => {
        const labels = activity.getTagsLabels().map(l => "'"+l+"'").join(',')
        const activityId = activity.id
        const currentDate = Date.now()
        const res = await database.query(`INSERT INTO "activity_tag"("activityId", "tagId", "order", "createdAt")
            SELECT $1, t.id, 0, $2
            FROM "tag" t
            WHERE t.id NOT IN (
                SELECT at.tagId
                FROM "activity_tag" at
                WHERE at."activityId" = $1
				AND at."tagId" = t.id
            )
            AND t."label" IN (${labels})
        `, [ activityId, currentDate ], true)
    }

}