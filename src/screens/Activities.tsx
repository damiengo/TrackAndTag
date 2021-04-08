import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Activity } from '../entities/Activity';
import EditActivityScreen from './EditActivity';
import BestTags from '../components/BestTags';
import ListItem from '../components/ListItem';
import { api } from '../services/api/LocalApi';
import database from '../services/api/Database'

export default function ActivitiesScreen({ navigation, route }: any) {
    const [activities, setActivities] = useState<Activity[]>([])
    const [tags, setTags]             = useState<any[]>([])

    useEffect(() => { 
      init() 
    }, [])

    const init = async () => {
        await database.setupConnection()
        const loadedAct = await api.getActivitiesAndTagsLabel(' ')
        if(loadedAct) {
          setActivities(loadedAct)
        }
        const loadedTags = await api.getBestTags('-7 days')
        if(loadedTags) {
          setTags(loadedTags.slice(0, 6))
        }
    }

    const renderItem = (activity: Activity) => {
      return <ListItem activity={activity} navigation={navigation} />
    }

    return (
        <>
          <StatusBar barStyle="dark-content" />
          <BestTags navigation={navigation} tags={tags} />
          <Text>Recently</Text>
          <SafeAreaView>
            <FlatList
              data={activities}
              extraData={activities}
              renderItem={({item}) => renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
            />
          </SafeAreaView>
          <ActionButton testID="add_button" buttonColor="#55FF00" buttonTextStyle={{ color: '#444' }} onPress={() => navigation.navigate('Edit')}>
          </ActionButton>
        </>
    );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
