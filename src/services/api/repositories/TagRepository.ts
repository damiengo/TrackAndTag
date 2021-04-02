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

    getBest = async() : Promise<Tag[]> => {
        `select t.text, count(t.tagId) as r_count, sum(a.number) as r_sum
from activity a
inner join ActivityTag ata on a.activityId = ata.activityId
inner join tag t on ata.tagId = t.tagId
where datetime(a.madeAt/1000, 'unixepoch') > date('now','-2 months')
group by t.tagId
order by r_sum desc`
    }

}