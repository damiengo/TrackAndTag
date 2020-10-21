import 'react-native';
import React from 'react';
import ActivitiesScreen from '../src/screens/Activities';

import ActionButton from 'react-native-action-button';

import { configure, shallow } from 'enzyme';

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