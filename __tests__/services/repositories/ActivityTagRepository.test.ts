import 'react-native'
import database from '../../../src/services/api/Database'
import ActivityTagRepository from '../../../src/services/api/repositories/ActivityTagRepository'
import { Activity } from '../../../src/entities/Activity'
import { Tag } from '../../../src/entities/Tag'

jest.mock('react-native-sqlite-storage')

describe('ActivityTagRepository', () => {

    const atagRepo = new ActivityTagRepository()

    it('Delete for an activity', async() => {
        const queryMock = jest.fn<any, [string, any]>(() => Promise.resolve([]))
        jest.spyOn(database, 'query').mockImplementation(queryMock)
        const activity = new Activity()
        activity.id = 1
        activity.addTags([ buildTag({label: 'label1'}), buildTag({label: 'label2'}) ])
        await atagRepo.deleteForActivity(activity)
        expect(queryMock.mock.calls.length).toBe(1)
        expect(queryMock.mock.calls[0][1].labels).toStrictEqual(['label1', 'label2'])
        expect(queryMock.mock.calls[0][1].activity_id).toStrictEqual(1)
    })

    it('Update for an activity', async() => {
        const queryMock = jest.fn<any, [string, any]>(() => Promise.resolve([]))
        jest.spyOn(database, 'query').mockImplementation(queryMock)
        const activity = new Activity()
        activity.id = 1
        activity.addTags([ buildTag({label: 'label1'}), buildTag({label: 'label2'}) ])
        await atagRepo.updateForActivity(activity)
        expect(queryMock.mock.calls.length).toBe(1)
        expect(queryMock.mock.calls[0][1].labels).toStrictEqual(['label1', 'label2'])
        expect(queryMock.mock.calls[0][1].activity_id).toStrictEqual(1)
    })

    it('Add for an activity', async() => {
        const queryMock = jest.fn<any, [string, any]>(() => Promise.resolve([]))
        jest.spyOn(database, 'query').mockImplementation(queryMock)
        const activity = new Activity()
        activity.id = 1
        activity.addTags([ buildTag({label: 'label1'}), buildTag({label: 'label2'}) ])
        await atagRepo.addForActivity(activity)
        expect(queryMock.mock.calls.length).toBe(1)
        expect(queryMock.mock.calls[0][1].labels).toStrictEqual(['label1', 'label2'])
        expect(queryMock.mock.calls[0][1].activity_id).toStrictEqual(1)
    })

})

const buildTag = (pTag: any) : Tag => {
    const tag = new Tag()
    return {...tag, ...pTag}
}