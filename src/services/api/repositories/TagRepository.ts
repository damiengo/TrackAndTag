import database from '../Database'
import { Tag } from '../../../entities/Tag';

export default class TagRepository {

    add = async(tag: Tag) => {
        await database.getRepository(Tag).save(tag)
    }

    exists = async(tag: Tag) : Promise<boolean> => {
        if(tag.label.trim() === '') {
            return false
        }
        const res = await database.query(`
            select id
            from tag
            where label = ?
        `, [ tag.label ])
        if(res.length === 0) {
            return false
        }
        return true
    }

    findWithLabels = async(labels: string[]) : Promise<Tag[]> => {
        return await database.query(`
            select * 
            from tag t 
            where t.label in (?)
        `, [ labels.map(l => "'"+l+"'").join(',') ])
    }

    getBest = async(anteriority: string) : Promise<any[]> => {
        return await database.query(`
            select 
                t.label as label, 
                count(t.id) as t_count, 
                sum(a.quantity) as t_sum
            from 
                activity a
            inner join 
                activity_tag ata on a.id = ata.activityId
            inner join 
                tag t on ata.tagId = t.id
            where 
                datetime(a.madeAt/1000, 'unixepoch') > date('now', '${anteriority}')
            group 
                by t.id
            order by 
                t_sum desc`)
    }

}