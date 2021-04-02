
import { Activity } from '../../entities/Activity';

export default interface Api {

    addActivity(activity: Activity) : void

    getActivitiesAndTagsLabel(tagsSeparator: string) : Promise<Activity[]>

}