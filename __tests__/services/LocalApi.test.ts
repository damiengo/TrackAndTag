import 'react-native'
import { api } from '../../src/services/api/LocalApi'
import { Activity } from '../../src/entities/Activity'
import { Tag } from '../../src/entities/Tag'
import { ActivityTag } from '../../src/entities/ActivityTag'

jest.mock('react-native-sqlite-storage')

let mockActivities: Activity[] = []
let mockTags: Tag[] = []
let mockActivityTags: ActivityTag[] = []
const mockGetActivitiesAndTagsLabel = jest.fn()
jest.mock('../../src/services/api/repositories/ActivityRepository', () => {
    const mock = 
        jest.fn().mockImplementation(() => {
            return {
                add: function(activity: Activity) {
                    if(!this.exists(activity)) {
                        mockActivities.push(activity)
                    }
                }, 
                exists: (activity: Activity) : boolean => {
                    return mockActivities.filter(a => a.id = activity.id).length === 1
                }, 
                getActivitiesAndTagsLabel: (tagsSeparator: string) => mockGetActivitiesAndTagsLabel(tagsSeparator)
            }
        })    
    return mock
})

jest.mock('../../src/services/api/repositories/TagRepository', () => {
    const mock = 
        jest.fn().mockImplementation(() => {
            return {
                add: (tag: Tag) => {
                    mockTags.push(tag)
                }, 
                exists: (tag: Tag): boolean => {
                    return mockTags.find(t => t.id === tag.id) !== undefined
                }
            }
        })
    return mock
})

jest.mock('../../src/services/api/repositories/ActivityTagRepository', () => {
    const mock = 
        jest.fn().mockImplementation(() => {
            return {
                add: (activityTag: ActivityTag) => {
                    mockActivityTags.push(activityTag)
                },
                updateForActivity: (activity: Activity) => {
                    mockActivityTags.map((at: ActivityTag) => {
                        if(at.activity.id === activity.id) {
                            activity.getTags().map((tag: Tag) => {
                                if(tag.id === at.tag.id) {
                                    at.updatedAt = Date.now()
                                }
                            })
                        }
                    })
                }, 
                addForActivity: function(activity: Activity) {
                    activity.getTags().map((tag: Tag) => {
                        if(!this.exists(activity, tag)) {
                            const aTag = {
                                id: 1, 
                                order: 0, 
                                activity: activity, 
                                tag: tag, 
                                createdAt: Date.now(), 
                                updatedAt: Date.now()
                            }
                            mockActivityTags.push(aTag)
                        }
                    })
                    
                }, 
                deleteForActivity: (activity: Activity) => {
                    const tagsId: number[] = activity.getTags().map(t => t.id)
                    mockActivityTags.map((at: ActivityTag) => {
                        if(!tagsId.includes(at.tag.id)) {
                            const idx = mockActivityTags.indexOf(at)
                            mockActivityTags.splice(idx, 1)
                        }
                    })
                }, 
                exists: (activity: Activity, tag: Tag): boolean => {
                    return mockActivityTags.filter(at => at.activity.id === activity.id && at.tag.id === tag.id).length > 0
                }
            }
        })
    return mock
})

describe('LocalApi', () => {

    it('Add an activity with new tags', async() => {
        mockActivities = []
        mockTags = []
        mockActivityTags = []
        const activity = new Activity()
        activity.id = 1
        activity.title = 'title'
        activity.description = 'description'
        const tag1 = new Tag()
        tag1.id = 1
        tag1.label = 'tag1'
        const tag2 = new Tag()
        tag2.id = 2
        tag2.label = 'tag2'
        activity.addTags([ tag1, tag2 ])
        await api.addActivity(activity)
        expect(mockActivities.length).toBe(1)
        expect(mockActivities[0]).toBe(activity)
        expect(mockTags.length).toBe(2)
        expect(mockTags[0]).toStrictEqual(tag1)
        expect(mockTags[1]).toStrictEqual(tag2)
        expect(mockActivityTags.length).toBe(2)
        expect(mockActivityTags[0].activity).toStrictEqual(activity)
        expect(mockActivityTags[0].tag).toStrictEqual(tag1)
        expect(mockActivityTags[1].activity).toStrictEqual(activity)
        expect(mockActivityTags[1].tag).toStrictEqual(tag2)
    })

    it('Add an activity with updating tags', async() => {
        mockActivities = []
        mockTags = []
        mockActivityTags = []
        // Existing activity
        const activity = new Activity()
        activity.id = 1
        activity.title = 'title'
        activity.description = 'description'
        const tag3 = new Tag()
        tag3.id = 3
        tag3.label = 'tag3'
        activity.addTags([ tag3 ])
        mockActivities = [ activity ]
        mockTags = [ tag3 ]
        mockActivityTags = [ activity.activityTags[0] ]
        // Updating activity
        const tag4 = new Tag()
        tag4.id = 4
        tag4.label = 'tag4'
        activity.addTags([ tag4 ])
        await api.addActivity(activity)
        expect(mockActivities.length).toBe(1)
        expect(mockTags.length).toBe(2)
        expect(mockTags[0]).toStrictEqual(tag3)
        expect(mockTags[1]).toStrictEqual(tag4)
        expect(mockActivityTags.length).toBe(2)
        expect(mockActivityTags[0].activity).toStrictEqual(activity)
        expect(mockActivityTags[0].tag).toStrictEqual(tag3)
        expect(mockActivityTags[1].activity).toStrictEqual(activity)
        expect(mockActivityTags[1].tag).toStrictEqual(tag4)
    })

    it('Add an activity with deleting tags', async() => {
        mockActivities = []
        mockTags = []
        mockActivityTags = []
        // Existing activity
        const activity = new Activity()
        activity.id = 1
        activity.title = 'title'
        activity.description = 'description'
        const tag3 = new Tag()
        tag3.id = 3
        tag3.label = 'tag3'
        activity.addTags([ tag3 ])
        mockActivities = [ activity ]
        mockTags = [ tag3 ]
        mockActivityTags = [ activity.activityTags[0] ]
        // Updating activity
        const activityUpd = new Activity()
        activityUpd.id = 1
        const tag4 = new Tag()
        tag4.id = 4
        tag4.label = 'tag4'
        activityUpd.addTags([ tag4 ])
        await api.addActivity(activityUpd)
        expect(mockActivities.length).toBe(1)
        expect(mockTags.length).toBe(2)
        expect(mockTags[0]).toStrictEqual(tag3)
        expect(mockTags[1]).toStrictEqual(tag4)
        expect(mockActivityTags.length).toBe(1)
        expect(mockActivityTags[0].tag).toStrictEqual(tag4)
    })

    it('Get activities with tags and labels', async() => {
        const separator = ' - '
        await api.getActivitiesAndTagsLabel(separator)
        expect(mockGetActivitiesAndTagsLabel.mock.calls.length).toBe(1)
        expect(mockGetActivitiesAndTagsLabel.mock.calls[0][0]).toBe(separator)
    })

})