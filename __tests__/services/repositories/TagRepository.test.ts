import 'react-native'
import { Repository } from 'typeorm'
import database from '../../../src/services/api/Database'
import TagRepository from '../../../src/services/api/repositories/TagRepository'
import { Tag } from '../../../src/entities/Tag'

jest.mock('react-native-sqlite-storage')

describe('TagRepository', () => {

    const tagRepo = new TagRepository()

    it('Add a tag', async() => {
        const saveMock = jest.fn()
        jest.spyOn(database, 'getRepository').mockImplementation(() => {
            const repo = new Repository()
            repo.save = saveMock
            return repo
        })
        const tag = new Tag()        
        await tagRepo.add(tag)
        expect(saveMock.mock.calls.length).toBe(1)
        expect(saveMock.mock.calls[0][0]).toBe(tag)
    })

    it('tag without label does not exists', async() => {
        const tag = new Tag()
        tag.label = ''
        const exists = await tagRepo.exists(tag)
        expect(exists).toBe(false)
    })

    it('tag not in database does not exists', async() => {
        jest.spyOn(database, 'query').mockImplementation(() => {
            return Promise.resolve([])
        })
        const tag = new Tag()
        tag.label = 'tag label'
        const exists = await tagRepo.exists(tag)
        expect(exists).toBe(false)
    })

    it('tag in database exists', async() => {
        jest.spyOn(database, 'query').mockImplementation(() => {
            return Promise.resolve([{ id: 1 }])
        })
        const tag = new Tag()
        tag.label = 'tag label'
        const exists = await tagRepo.exists(tag)
        expect(exists).toBe(true)
    })

    it('find with label', async() => {
        const queryMock = jest.fn<any, [string, any]>(() => Promise.resolve([]))
        jest.spyOn(database, 'query').mockImplementation(queryMock)
        const labels = [ 'label1', 'label2' ]
        await tagRepo.findWithLabels(labels)
        expect(queryMock.mock.calls.length).toBe(1)
        expect(queryMock.mock.calls[0][1]).toStrictEqual({ labels: labels })
    })
})