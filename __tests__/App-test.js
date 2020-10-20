/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

import ActionButton from 'react-native-action-button';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Note: test renderer must be required after react-native.
import { create, act } from 'react-test-renderer';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

it('renders correctly', async () => {
  let root; 
  await act(async() => {
    root = create(<App />)
  });
  expect(root.toJSON()).toMatchSnapshot();
});

it('add an item', () => {
  const wrapper = shallow(<App />)
  //console.log(wrapper.debug());
  //wrapper.find(ActionButton).simulate('click')
});