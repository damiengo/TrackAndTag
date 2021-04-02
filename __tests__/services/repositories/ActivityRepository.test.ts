import 'react-native'
import { Repository } from 'typeorm'
import database from '../../../src/services/api/Database'
import ActivityRepository from '../../../src/services/api/repositories/ActivityRepository'
import { Activity } from '../../../src/entities/Activity'

jest.mock('react-native-sqlite-storage')

describe('ActivityRepository', () => {

    const activityRepo = new ActivityRepository()

    it('Add an activity', async() => {
        const saveMock = jest.fn()
        jest.spyOn(database, 'getRepository').mockImplementation(() => {
            const repo = new Repository()
            repo.save = saveMock
            return repo
        })
        const act = new Activity()        
        await activityRepo.add(act)
        expect(saveMock.mock.calls.length).toBe(1)
        expect(saveMock.mock.calls[0][0]).toBe(act)
    })

    it('Get an activity and tags labels', async() => {
        const now = Date.now()
        const queryMock = jest.fn<any, [string, any]>(() => Promise.resolve([{
            a_id: 1, 
            a_title: 'title', 
            a_description: 'description', 
            a_quantity: 8, 
            a_made_at: now, 
            a_created_at: now, 
            a_updated_at: null, 
            t_labels: ['label1', 'label2', 'label3']
        }]))
        jest.spyOn(database, 'query').mockImplementation(queryMock)
        const separator = ' - '
        const activitiesWLabels = await activityRepo.getActivitiesAndTagsLabel(separator)
        expect(queryMock.mock.calls.length).toBe(1)
        expect(queryMock.mock.calls[0][1]).toStrictEqual({ separator: separator })
        expect(activitiesWLabels.length).toBe(1)
        expect(activitiesWLabels[0]).toStrictEqual({
            id: 1, 
            title: 'title', 
            description: 'description', 
            quantity: 8, 
            madeAt: now, 
            createdAt: now, 
            updatedAt: null, 
            tagsLabels: ['label1', 'label2', 'label3']
        })
    })

})