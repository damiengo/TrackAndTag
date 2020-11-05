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
import ListItem from '../components/ListItem';
import { useIsFocused } from "@react-navigation/native";

export default function ActivitiesScreen({ navigation, route }) {
    const [activities, setActivities] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
      getActivities()
    }, [isFocused]);

    const getActivities = () => {

      try {
        //AsyncStorage.removeItem('@activities')
        AsyncStorage.getItem('@activities').then(data => {
          const json = JSON.parse(data) || []
          var items = []
          Object.keys(json).forEach(function(key) {
            items.push(json[key])
          })
          items = items.reverse()
          setActivities(items)
        })
      } catch(e) {
        console.error(e);
      }
    }

    const renderItem = (item) => {
      return <ListItem item={item} navigation={navigation} />
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <FlatList
                data={activities}
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
