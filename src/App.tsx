/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ActivitiesScreen from './screens/Activities';
import EditActivityScreen from './screens/EditActivity';
import TagStatScreen from './screens/TagStat';

const Stack = createStackNavigator();

const App = () => {
  
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={ActivitiesScreen} options={{title: 'Activities'}} />
          <Stack.Screen name="Edit" component={EditActivityScreen} options={{title: 'Edit activity'}} />
          <Stack.Screen name="TagStat" component={TagStatScreen} options={{title: 'Tag stat'}} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;