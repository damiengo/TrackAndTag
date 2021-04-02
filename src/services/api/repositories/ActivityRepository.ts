import database from '../Database'
import { Activity } from '../../../entities/Activity';

export default class ActivityRepository {

    add = async(activity: Activity) : Promise<any> => {
        return await database.getRepository(Activity).createQueryBuilder()
                    .insert()
                    .into(Activity)
                    .values([
                        {   
                            title: activity.title, 
                            description: activity.description, 
                            quantity: activity.quantity, 
                            madeAt: activity.madeAt, 
                            createdAt: Date.now() 
                        }
                    ])
                    .execute();
    }

    update = async(activity: Activity) => {
        const res = await database.query(`UPDATE "activity"
            SET "title" = $1, 
                "description" = $2, 
                "quantity" = $3, 
                "madeAt" = $4, 
                "updatedAt" = $5
            WHERE "id" = $6
        `, [ activity.title, 
             activity.description, 
             activity.quantity, 
             activity.madeAt, 
             Date.now(), 
             activity.id ])
    }

    exists = async(activity: Activity) : Promise<boolean> => {
        if(activity.id === undefined) {
            return false
        }
        const res = await database.query(`
            select id
            from activity
            where id = ?
        `, [ activity.id ])

        if(res.length === 0) {
            return false
        }
        return true
    }

    getActivitiesAndTagsLabel = async(tagsSeparator: string) : Promise<Activity[]> => {
        const activities = await database.query(`
            select 
              a.id as a_id, 
              a.title as a_title, 
              a.description as a_description, 
              a.quantity as a_quantity, 
              a.madeAt as a_made_at, 
              a.createdAt as a_created_at, 
              a.updatedAt as a_updated_at, 
              group_concat(t.label, '`+tagsSeparator+`') as t_labels
            from activity a
            left join activity_tag at on a.id = at.activityId
            left join tag t on at.tagId = t.id
            group by a.id
            order by a.madeAt desc
            limit 10
        `)

        return activities.map((a: any) => {
            return {
                id: a.a_id, 
                title: a.a_title, 
                description: a.a_description, 
                quantity: a.a_quantity, 
                madeAt: a.a_made_at, 
                createdAt: a.a_created_at, 
                updatedAt: a.a_updated_at, 
                tagsLabels: a.t_labels
            }
        })
    }

}