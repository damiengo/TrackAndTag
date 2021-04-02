import 'react-native'
import * as typeorm from 'typeorm'

import database from '../../src/services/api/Database'
import { Tag } from '../../src/entities/Tag'

jest.mock('react-native-sqlite-storage')

describe('Database', () => {

    it('getRepository', () => {
        const getRepositoryMock = jest.fn()
        jest.spyOn(typeorm, 'getRepository').mockImplementation(() => { return getRepositoryMock() })
        database.getRepository(Tag)
        expect(getRepositoryMock.mock.calls.length).toBe(1)
    });

    it('query', () => {
        const sqlSelect = 'select 1 from dual'
        const parameters = { item: 'value' }
        const queryMock = jest.fn()
        jest.spyOn(typeorm.getManager(), 'query').mockImplementation((sql: string, parameters: any) => {
            queryMock(sql, parameters)
            return Promise.resolve()
        })
        // No parameters
        database.query(sqlSelect)
        expect(queryMock.mock.calls.length).toBe(1)
        expect(queryMock.mock.calls[0][0]).toBe(sqlSelect)
        expect(queryMock.mock.calls[0][1]).toBeUndefined()
        // With parameters
        database.query(sqlSelect, parameters)
        expect(queryMock.mock.calls.length).toBe(2)
        expect(queryMock.mock.calls[1][1]).toBe(parameters)
    });

});