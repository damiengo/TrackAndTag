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
import EditActivityScreen from './EditActivity';
import AsyncStorage from '@react-native-community/async-storage';
import ListItem from '../components/ListItem'

export default function ActivitiesScreen({ navigation, route }) {
    const [activities, setActivities] = useState([])

    useEffect(() => {
      getActivities()
    });

    const getActivities = async () => {
      try {
        //AsyncStorage.removeItem('@activities')
        await AsyncStorage.getItem('@activities').then(data => 
          setActivities(data != null ? JSON.parse(data).reverse() : [])
        )
      } catch(e) {
        console.error(e);
      }
    }

    const renderItem = (item, index) => {
      return <ListItem item={item} index={index} navigation={navigation} />
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <FlatList
                data={activities}
                renderItem={({item, index}) => renderItem(item, index)}
                keyExtractor={(item, index) => index.toString()}
              />
            </SafeAreaView>
            <ActionButton buttonColor="#55FF00" buttonTextStyle={{ color: '#444' }} onPress={() => navigation.navigate('Edit')}>
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
