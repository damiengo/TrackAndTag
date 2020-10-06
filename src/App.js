/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import ActivitiesScreen from './screens/Activities'
import EditActivityScreen from './screens/EditActivity'

const Stack = createStackNavigator();

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