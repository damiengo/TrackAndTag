import { FlatList, ListRenderItemInfo } from 'react-native';
import React from 'react';
import ActivitiesScreen from '../../src/screens/Activities';

import ActionButton from 'react-native-action-button';
import ListItem from '../../src/components/ListItem';
import { Activity } from '../../src/entities/Activity';

import { create, ReactTestRenderer } from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { fireEvent, render, waitFor, act } from '@testing-library/react-native'

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('@react-navigation/native');
jest.mock('react-native-sqlite-storage');

it('add an item', () => {
  const navigation = {
    navigate: jest.fn()
  }
  const wrapper = shallow(<ActivitiesScreen navigation={navigation} />)
  wrapper.find(ActionButton).simulate('press')
  expect(navigation.navigate.mock.calls.length).toEqual(1);
});

it('list existing items', async () => {
    const navigation = {
      navigate: jest.fn()
    }
    const activity = new Activity();
    activity.id = 1
    activity.title = 'The title'
    activity.description = 'A short description'
    activity.quantity = 18
    activity.madeAt = (new Date()).getTime()

    const wrapper = shallow(<ActivitiesScreen navigation={navigation} />)
    wrapper.update()
    const lrii: ListRenderItemInfo<Activity> = {
      item: activity, 
      index: 1, 
      separators: {
          highlight: () => jest.fn(),
          unhighlight: () => jest.fn(),
          updateProps: (select: "leading" | "trailing", newProps: any) => jest.fn()
      }
    }
    const flastListProps = wrapper.find(FlatList).props()
    if(flastListProps.renderItem) {
      const flastListRndrItm = flastListProps.renderItem(lrii)
      if(flastListRndrItm) {
        expect(flastListRndrItm.type).toBe(ListItem)
        expect(flastListRndrItm.props.item).toBe(activity)
      }
      if(flastListProps.keyExtractor) {
        const flastListKeyExtr = flastListProps.keyExtractor(activity, 8)
        expect(flastListKeyExtr).toBe("8")
      }
    }
})