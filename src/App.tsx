/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useCallback, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createConnection, Connection } from 'typeorm';

import ActivitiesScreen from './screens/Activities';
import EditActivityScreen from './screens/EditActivity';

import { Activity } from './entities/Activity';
import { Tag } from './entities/Tag';

const Stack = createStackNavigator();

const App = () => {

  const [defaultConnection, setconnection] = useState<Connection | null>(null);
  const setupConnection = useCallback(async () => {
    try {
      const connection = await createConnection({
        type: 'react-native',
        database: 'track-and-tag',
        location: 'default',
        logging: ['error', 'query', 'schema'],
        synchronize: true,
        entities: [Activity, Tag],
      });
      setconnection(connection);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={ActivitiesScreen} options={{title: 'Activities'}} />
          <Stack.Screen name="Edit" component={EditActivityScreen} options={{title: 'Edit activity'}} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;