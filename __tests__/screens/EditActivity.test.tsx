import 'react-native';
import React from 'react';
import EditActivityScreen from '../../src/screens/EditActivity';

import { Button, TextInput } from 'react-native'

import { create, act } from 'react-test-renderer';
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('@react-navigation/native');

it('add an item', async () => {
    //AsyncStorage.removeItem('@activities')
    const route = {}
    const navigation = {
        setOptions: jest.fn(),
        goBack: jest.fn()
    }
    const wrapper = shallow(<EditActivityScreen route={route} navigation={navigation} />)
    wrapper.find(TextInput).at(0).simulate('changeText', 'tag7 tag8')
    wrapper.find(TextInput).at(1).simulate('changeText', 'Title 1')
    wrapper.find(TextInput).at(2).simulate('changeText', 'Description 2')
    wrapper.find(TextInput).at(3).simulate('changeText', 88)
    wrapper.find(Button).at(0).simulate('press')
    await tick()
    /* await AsyncStorage.getItem('@activities')
                      .then(async (data) => {
                          const activities = JSON.parse(data)
                          const key = Object.getOwnPropertyNames(activities)
                          const activity = activities[key]
                          expect(activity.tags).toEqual(['tag7', 'tag8'])
                          expect(activity.title).toEqual('Title 1')
                          expect(activity.description).toEqual('Description 2')
                          expect(activity.number).toEqual(88)
                      }) */
    expect(navigation.goBack.mock.calls.length).toEqual(1)
    //expect(AsyncStorage.getItem('@activities')).toBeDefined
});

it('edit an item', async () => {
    //AsyncStorage.removeItem('@activities')
    const route = {
      params: {
        item: {
          date: (new Date()).getTime(), 
          tags: ['tag1', 'tag2'], 
          title: 'Title item to edit', 
          description: 'Description to edit', 
          number: 5, 
          createdAt: (new Date()).getTime(), 
          updatedAt: (new Date()).getTime() 
        }
      }
    }
    const navigation = {
        setOptions: jest.fn(),
        goBack: jest.fn()
    }
    const wrapper = shallow(<EditActivityScreen route={route} navigation={navigation} />)
    wrapper.find(TextInput).at(2).simulate('changeText', 'Description edited 8')
    wrapper.find(TextInput).at(3).simulate('changeText', 9)
    wrapper.find(Button).at(0).simulate('press')
    await tick()
    expect(navigation.goBack.mock.calls.length).toEqual(1)
    /* await AsyncStorage.getItem('@activities')
                      .then(async (data) => {
                          const activities = JSON.parse(data)
                          const key = Object.getOwnPropertyNames(activities)
                          const activity = activities[key]
                          expect(activity.tags).toEqual(['tag1', 'tag2'])
                          expect(activity.title).toEqual('Title item to edit')
                          expect(activity.description).toEqual('Description edited 8')
                          expect(activity.number).toEqual(9)
                      })
    expect(AsyncStorage.getItem('@activities')).toBeDefined */
});

// https://stackoverflow.com/a/43855794
// Helper function returns a promise that resolves after all other promise mocks,
// even if they are chained like Promise.resolve().then(...)
// Technically: this is designed to resolve on the next macrotask
function tick() {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  })
}