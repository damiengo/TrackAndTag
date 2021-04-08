import Api from './Api'
import ActivityRepository from './repositories/ActivityRepository'
import TagRepository from './repositories/TagRepository'
import ActivityTagRepository from './repositories/ActivityTagRepository'
import { Activity } from '../../entities/Activity'
import { Tag } from '../../entities/Tag'
import { ActivityTag } from '../../entities/ActivityTag'

class LocalApi implements Api {

    private activityRepo : ActivityRepository
    private tagRepo : TagRepository
    private activityTagRepo : ActivityTagRepository

    constructor() {
        this.activityRepo = new ActivityRepository()
        this.tagRepo = new TagRepository()
        this.activityTagRepo = new ActivityTagRepository()
    }

    addActivity = async (activity: Activity) => {
        await this.upsertActivity(activity)
        await this.saveActivityTags(activity)
    }

    upsertActivity = async (activity: Activity) => {
        if(await this.activityRepo.exists(activity)) {
            await this.activityRepo.update(activity)
        }
        else {
            const res = await this.activityRepo.add(activity)
            const newId = res.raw
            activity.id = newId
        }
    }

    saveActivityTags = async (activity: Activity) => {
        await this.saveTagsFromActivity(activity)
        await this.activityTagRepo.updateForActivity(activity)
        await this.activityTagRepo.addForActivity(activity)
        await this.activityTagRepo.deleteForActivity(activity)
    }

    saveTagsFromActivity = async (activity: Activity) => {
        await Promise.all(activity.getTags().map((tag: Tag) => this.saveTag(tag)))
    }

    saveTag = async (tag: Tag) => {
        if(tag.label !== '' && !await this.tagRepo.exists(tag)) {
            tag.createdAt = (new Date()).getTime()
            await this.tagRepo.add(tag)
        }
    }

    getActivitiesAndTagsLabel = async (tagsSeparator: string) : Promise<Activity[]> => {
        return await this.activityRepo.getActivitiesAndTagsLabel(tagsSeparator)
    }

    getBestTags = async (anteriority: string) : Promise<any[]> => {
        return await this.tagRepo.getBest(anteriority)
    }

    getTagSumByDay = async (tagLabel: string) : Promise<any[]> => {
        return await this.tagRepo.getSumByDay(tagLabel)
    }

}

export const api = new LocalApi()