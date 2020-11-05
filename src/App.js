/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ActivitiesScreen from './screens/Activities';
import EditActivityScreen from './screens/EditActivity';

import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './model/schema';

const Stack = createStackNavigator();

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  dbName: 'track-and-tag', // optional database name or file system path
  // migrations, // optional migrations
  synchronous: false, // synchronous mode only works on iOS. improves performance and reduces glitches in most cases, but also has some downsides - test with and without it
  // experimentalUseJSI: true, // experimental JSI mode, use only if you're brave
});

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [
    // Post, // ⬅️ You'll add Models to Watermelon here
  ],
  actionsEnabled: true,
});

const App: () => React$Node = () => {
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