/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

import { configure, shallow } from 'enzyme';

// Note: test renderer must be required after react-native.
import { create, act } from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

it('renders correctly', async () => {
  let root;
  await act(async() => {
    root = create(<App />);
    expect(root.toJSON()).toMatchSnapshot();
  });
});
