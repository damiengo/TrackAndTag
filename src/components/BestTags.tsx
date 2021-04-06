import React from 'react'
import {
  View,
  Text, 
  FlatList
} from 'react-native';

export default function BestTags({ navigation, tags }: any) {

    const onTagPress = (event, tag) => {
      console.log(tag);
      navigation.navigate('TagStat', {item: tag})
    }

    const renderItem = (item: any) => {
      return (
        <View
            style={{
              flexDirection: 'row',
              flex: 1,
              flexWrap: 'wrap',
              alignItems: 'flex-start'
            }}
        >
            <Text onPress={(e) => onTagPress(e, item.label)} style={{marginRight: 5, marginTop: 2, backgroundColor: '#55FF00'}}>#{item.label}</Text>
            <Text>{item.t_sum}</Text>
        </View>
      )
    }

    return (
        <View>
            <Text>Last 7 days</Text>
            <FlatList
              numColumns={2}
              data={tags}
              renderItem={({item}) => renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )

}