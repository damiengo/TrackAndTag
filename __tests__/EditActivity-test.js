import 'react-native';
import React from 'react';
import EditActivityScreen from '../src/screens/EditActivity';

import { Button } from 'react-native'

import { create, act } from 'react-test-renderer';
import AsyncStorage from '@react-native-community/async-storage';
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('add an item', async () => {
    const route = {}
    const navigation = {
        goBack: jest.fn()
    }
    const wrapper = shallow(<EditActivityScreen route={route} navigation={navigation} />)
    wrapper.find(Button).simulate('press')
    await tick()
    expect(navigation.goBack.mock.calls.length).toEqual(1);
    expect(AsyncStorage.getItem('@activities')).toBeDefined
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