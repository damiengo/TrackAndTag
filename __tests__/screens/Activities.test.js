import 'react-native';
import React from 'react';
import ActivitiesScreen from '../../src/screens/Activities';

import ActionButton from 'react-native-action-button';
import ListItem from '../../src/components/ListItem'

import { create, act } from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import AsyncStorage from '@react-native-community/async-storage';
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

it('list existing items', async () => {
    const activity = {
        tags: 'tag1 tag2'.split(' '), 
        title: 'The title', 
        description: 'A short description', 
        number: 18, 
        date: (new Date()).getTime(), 
        createdAt: (new Date()).getTime(), 
        updatedAt: (new Date()).getTime()
    }
    var a = {}
    const key = activity.createdAt
    a[key] = activity
    await AsyncStorage.setItem('@activities', JSON.stringify(a))

    let component; 
    await act(async() => {
      component = create(<ActivitiesScreen />)
    });

    let listItem = component.root.findByType(ListItem)
    expect(listItem.props.item).toEqual(activity)
})
