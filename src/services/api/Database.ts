import { 
    createConnection, 
    getRepository, 
    getConnection, 
    Repository, 
    Transaction, 
    getManager, 
    Entity, 
    EntityTarget, 
    EntityManager
} from 'typeorm';

import { Activity } from '../../entities/Activity';
import { Tag } from '../../entities/Tag';
import { ActivityTag } from '../../entities/ActivityTag';

class Database {

    setupConnection = async () => {
        try {
            getConnection()
        }
        catch(e) {
            await createConnection({
                type: 'react-native',
                database: 'track-and-tag.db',
                location: 'default',
                logging: ['error', 'query', 'schema'],
                synchronize: true, // recreate database ?
                entities: [ Activity, Tag, ActivityTag ],
            })
        }
    }

    getRepository = <Entity>(typ: EntityTarget<Entity>) : Repository<Entity> => {
        return getRepository(typ) 
    }

    query = async (sql: string, parameters?: any, transactional: boolean = false) : Promise<any> => {
        if(transactional) {
            return await getManager().transaction(async transactionalEM => {
                return await this.runQuery(sql, transactionalEM, parameters)
            })
        }
        return await this.runQuery(sql, getManager(), parameters)
    }

    runQuery = async(sql: string, manager: EntityManager, parameters?: any) : Promise<any> => {
        return await manager.query(sql, parameters)
    }

}

const database = new Database()

export default database