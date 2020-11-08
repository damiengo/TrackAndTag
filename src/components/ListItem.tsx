import React from 'react'
import {
  View,
  Text, 
  TouchableWithoutFeedback
} from 'react-native';
import Moment from 'moment';

import { Tag } from '../entities/Tag'

export default function ListItem({ navigation, item }: any) {

    const genTags = (tags: Tag) => {
        return Object.values(tags).map((tag) => {
            return '#'+tag
        }).join(' • ')
    }

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Edit', {item: item})}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              marginTop: 5,
              alignItems: 'center'
            }}
          >
            <Text style={{marginRight: 5, marginLeft: 5}}>{Moment(item.date).format('DD/MM')}</Text> 
            <Text style={{marginRight: 5, paddingLeft: 4, paddingRight: 4, backgroundColor: '#55FF00'}}>{item.number}</Text> 
            <Text style={{marginRight: 5, fontWeight: 'bold'}}>{item.title}</Text> 
            <Text style={{marginRight: 5, fontSize: 13}}>{genTags(item.tags)}</Text> 
          </View>
        </TouchableWithoutFeedback>
    )

}