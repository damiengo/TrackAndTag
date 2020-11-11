import React from 'react'
import {
  View,
  Text, 
  TouchableWithoutFeedback
} from 'react-native';
import Moment from 'moment';

import { Tag } from '../entities/Tag'

export default function ListItem({ navigation, activity }: any) {

    const genTags = (tags: Tag[]): string => {
        return tags.map((tag) => {
            return '#'+tag.label
        }).join(' • ')
    }

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Edit', {item: activity})}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              marginTop: 5,
              alignItems: 'center'
            }}
          >
            <Text style={{marginRight: 5, marginLeft: 5}}>{Moment(activity.made_at).format('DD/MM')}</Text> 
            <Text style={{marginRight: 5, paddingLeft: 4, paddingRight: 4, backgroundColor: '#55FF00'}}>{activity.quantity}</Text> 
            <Text style={{marginRight: 5, fontWeight: 'bold'}}>{activity.title}</Text> 
            <Text style={{marginRight: 5, fontSize: 13}} testID='input_tag'>{genTags(activity.tags)}</Text> 
          </View>
        </TouchableWithoutFeedback>
    )

}