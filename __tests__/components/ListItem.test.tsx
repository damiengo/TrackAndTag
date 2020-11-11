import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import ListItem from '../../src/components/ListItem';
import { Activity } from '../../src/entities/Activity';
import { Tag } from '../../src/entities/Tag';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('add an item', () => {
    const navigation = {
        navigate: jest.fn()
    }
    const tag1 = new Tag()
    tag1.id = 1
    tag1.label = 'tag 1'
    const tag2 = new Tag()
    tag2.id = 2
    tag2.label = 'tag 2'

    const activity = new Activity();
    activity.id = 1
    activity.title = 'The title'
    activity.description = 'A short description'
    activity.quantity = 18
    activity.madeAt = (new Date()).getTime()
    activity.tags = [tag1, tag2]

    const wrapper = shallow(<ListItem navigation={navigation} activity={activity} />)
    
    wrapper.find(TouchableWithoutFeedback).simulate('press')
    expect(navigation.navigate.mock.calls.length).toEqual(1)
    expect(navigation.navigate).toBeCalledWith('Edit', { item: activity })
    expect(wrapper).toMatchSnapshot()
});