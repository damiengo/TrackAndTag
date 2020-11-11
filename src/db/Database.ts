import React from 'react';
import { createConnection, getRepository, Repository, Entity, EntityTarget } from 'typeorm';

import { Activity } from '../entities/Activity';
import { Tag } from '../entities/Tag';

let defaultConnection: any = null;

const setupConnection = async () => {
    try {
        const connection = await createConnection({
            type: 'react-native',
            database: 'track-and-tag.db',
            location: 'default',
            logging: ['error', 'query', 'schema'],
            synchronize: true, // recreate database ?
            entities: [Activity, Tag],
        });
        defaultConnection = connection;
    } catch (error) {
        console.log(error);
    }
};

const getRepoFor = async<Entity>(typ: EntityTarget<Entity>) : Promise<Repository<Entity>> => {
    if(defaultConnection === null) {
        await setupConnection()
    }
    return getRepository(typ) 
}

export const getActivities = async() : Promise<Activity[] | undefined> => {
    const repo = await getRepoFor(Activity)
    return repo.find()
}

export const addActivity = async (activity: Activity) => {
    const repo = await getRepoFor(Activity)
    await repo.save(activity);
}