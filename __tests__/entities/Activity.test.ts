import 'react-native'
import { Activity } from '../../src/entities/Activity'
import { Tag } from '../../src/entities/Tag'

describe('Activity', () => {

    it('Add tags', async() => {
        const activity = new Activity()
        const tag1 = new Tag()
        tag1.label = 'label1'
        const tag2 = new Tag()
        tag2.label = 'label2'
        activity.addTags([ tag1, tag2 ])
        expect(activity.activityTags.length).toBe(2)
        expect(activity.activityTags[0].tag).toBe(tag1)
        expect(activity.activityTags[1].tag).toBe(tag2)
    })

    it('Get tags', () => {
        const activity = new Activity()
        const tag1 = new Tag()
        tag1.label = 'label1'
        const tag2 = new Tag()
        tag2.label = 'label2'
        activity.addTags([ tag1, tag2 ])
        const tags = activity.getTags()
        expect(tags.length).toBe(2)
        expect(tags[0]).toStrictEqual(tag1)
        expect(tags[1]).toStrictEqual(tag2)
    })

    it('Get tags labels', () => {
        const activity = new Activity()
        const tag1 = new Tag()
        tag1.label = 'label1'
        const tag2 = new Tag()
        tag2.label = 'label2'
        activity.addTags([ tag1, tag2 ])
        const labels = activity.getTagsLabels()
        expect(labels).toStrictEqual(['label1', 'label2'])
    })

})