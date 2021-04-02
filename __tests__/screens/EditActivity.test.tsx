import 'react-native';
import React from 'react';
import EditActivityScreen from '../../src/screens/EditActivity';

import { Button, TextInput, Alert } from 'react-native'

import { create, act } from 'react-test-renderer';
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('@react-navigation/native');
jest.mock('react-native-sqlite-storage');

import { Activity } from '../../src/entities/Activity';
import { Tag } from '../../src/entities/Tag';

describe('activity', () => {

  it('add', async () => {
      const route = {}
      const navigation = {
          setOptions: jest.fn(),
          goBack: jest.fn()
      }
      const wrapper = shallow(<EditActivityScreen route={route} navigation={navigation} />)
      wrapper.find({'testID': 'input_tags'}).simulate('changeText', 'tag7 tag8')
      wrapper.find({'testID': 'input_title'}).simulate('changeText', 'Title added 1')
      wrapper.find({'testID': 'input_description'}).simulate('changeText', 'Description added 2')
      wrapper.find({'testID': 'input_number'}).simulate('changeText', 88)
      wrapper.find({'testID': 'input_date'}).simulate('focus')
      wrapper.find({'testID': 'dateTimePicker'}).simulate('change')
      wrapper.find({'testID': 'button_save'}).simulate('press')
      await Promise.resolve();
      expect(navigation.goBack.mock.calls.length).toEqual(1)
      //const activities = await getActivities()
      const activities: Activity[] = []
      if(activities && activities.length == 1) {
        const savedActivity = activities[0]
        expect(savedActivity.title).toBe('Title added 1')
        expect(savedActivity.description).toBe('Description added 2')
        expect(savedActivity.quantity).toBe(88)
        const tags = savedActivity.getTags()
        if(tags && tags.length == 2) {
          const tag1 = tags[0]
          const tag2 = tags[1]
          expect(tag1.label).toBe('tag7')
          expect(tag2.label).toBe('tag8')
        }
        else {
          fail('No tags saved')
        }
      }
      else {
        fail('No activity saved')
      }
  });

  it('edit', async () => {
      jest.clearAllMocks()
      const tag1 = new Tag()
      tag1.label = 'tag1'
      const tag2 = new Tag()
      tag2.label = 'tag2'
      const activity = new Activity()
      activity.id = 1
      activity.title = 'Title item to edit'
      activity.description = 'Description to edit'
      activity.quantity = 5
      activity.madeAt = (new Date()).getTime()
      activity.createdAt = (new Date()).getTime()
      activity.addTags([ tag1, tag2 ])
      const route = {
        params: {
          item: activity
        }
      }
      const navigation = {
          setOptions: jest.fn(),
          goBack: jest.fn()
      }
      const wrapper = shallow(<EditActivityScreen route={route} navigation={navigation} />)
      wrapper.find({'testID': 'input_description'}).simulate('changeText', 'Description edited 8')
      wrapper.find({'testID': 'input_number'}).simulate('changeText', 9)
      wrapper.find({'testID': 'button_save'}).simulate('press')
      await Promise.resolve();
      expect(navigation.goBack.mock.calls.length).toEqual(1)
      expect(wrapper).toMatchSnapshot()
      //const activities = await getActivities()
      const activities: Activity[] = []
      if(activities && activities.length == 1) {
        const savedActivity = activities[0]
        expect(savedActivity.title).toBe('Title item to edit')
        expect(savedActivity.description).toBe('Description edited 8')
        expect(savedActivity.quantity).toBe(9)
        const tags = savedActivity.getTags()
        if(tags && tags.length == 2) {
          const tag1 = tags[0]
          const tag2 = tags[1]
          expect(tag1.label).toBe('tag1')
          expect(tag2.label).toBe('tag2')
        }
        else {
          fail('No tags saved')
        }
      }
  });

  it('delete', async () => {
      const activity = new Activity()
      activity.id = 1
      activity.title = 'Title item to delete'
      activity.description = 'Description to delete'
      activity.quantity = 5
      activity.madeAt = (new Date()).getTime()
      activity.createdAt = (new Date()).getTime()
      activity.activityTags = []
      const route = {
        params: {
          item: activity
        }
      }
      const navigation = {
          setOptions: jest.fn(),
          goBack: jest.fn()
      }
      const wrapper = shallow(<EditActivityScreen route={route} navigation={navigation} />)
      wrapper.find({'testID': 'button_delete'}).simulate('press')
      await Promise.resolve()
      expect(wrapper).toMatchSnapshot()
  });
});