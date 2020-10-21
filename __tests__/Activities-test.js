import 'react-native';
import React from 'react';
import ActivitiesScreen from '../src/screens/Activities';

import ActionButton from 'react-native-action-button';

import { configure, shallow } from 'enzyme';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

it('add an item', () => {
  const navigation = {
    navigate: jest.fn()
  }
  const wrapper = shallow(<ActivitiesScreen navigation={navigation} />)
  wrapper.find(ActionButton).simulate('press')
  expect(navigation.navigate.mock.calls.length).toEqual(1);
});

it('list existing items', () => {
    const activity = {
        tags: 'tag1 tag2'.split(' '), 
        title: 'The title', 
        description: 'A short description', 
        number: 18, 
        date: new Date(), 
        createdAt: new Date(), 
        updatedAt: new Date()
    }
    var a = {}
    const key = activity.createdAt.getTime()
    a[key] = activity
    mockAsyncStorage.setItem('@activities', JSON.stringify(a))
    const wrapper = shallow(<ActivitiesScreen />)
    const flData = wrapper
             .find('FlatList')
             .props()
             .data
    //expect(flData).toHaveLength(1)
})
