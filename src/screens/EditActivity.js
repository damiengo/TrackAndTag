import React, { useState, useEffect } from 'react'
import { TextInput, Button } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage';

export default function EditActivityScreen({ navigation, route }) {

    const genTags = (tags) => {
        return Object.values(tags).map((tag) => {
            return tag
        }).join(' ')
    }

    const { item } = route.params ?? 
                     { 
                         item: { 
                             date: (new Date()).getTime(), 
                             tags: '', 
                             title: '', 
                             description: '', 
                             number: 0, 
                             createdAt: (new Date()).getTime(), 
                             updatedAt: (new Date()).getTime() 
                         } 
                     }

    if( ! route.params ) {
        navigation.setOptions({ title: 'New activity' })
    }

    const [date, setDate]                     = useState(item.date);
    const [tags, setTags]                     = useState(genTags(item.tags));
    const [title, setTitle]                   = useState(item.title);
    const [description, setDescription]       = useState(item.description);
    const [number, setNumber]                 = useState(item.number);
    const [createdAt, setCreatedAt]           = useState(item.createdAt);
    const [updatedAt, setUpdatedAt]           = useState(item.updatedAt);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const formatDate = (date) => {
        Moment.locale('fr')
        return Moment(new Date(date)).format('DD/MM/yyyy')
    }

    const onDateTimePickerChange = (event, value) => {
        setDate(value || (new Date()).getTime())
        setShowDatePicker(false)
    }

    const onPressSave = async (event) => {
        try {
            const activity = {
                tags: tags.split(' '), 
                title: title, 
                description: description, 
                number: number, 
                date: date, 
                createdAt: createdAt, 
                updatedAt: updatedAt
            }
            await AsyncStorage.getItem('@activities')
            .then(async (activities) => {
                var a = activities ? JSON.parse(activities) : {}
                const key = activity.createdAt
                a[key] = activity
                await AsyncStorage.setItem('@activities', JSON.stringify(a))
                navigation.goBack()
            })
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
           <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder='Tags'
            autoCapitalize='none'
            onChangeText={text => setTags(text)}
            defaultValue={tags}
           />
           <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder='Title'
            onChangeText={text => setTitle(text)}
            defaultValue={title}
           />
           <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder='Description'
            onChangeText={text => setDescription(text)}
            defaultValue={description}
           />
           <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder='Number'
            keyboardType='numeric'
            onChangeText={text => setNumber(text)}
            defaultValue={String(number)}
           />
           <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder='Date'
            defaultValue={formatDate(date)}
            onFocus={() => setShowDatePicker(true)}
           />
           {showDatePicker && (
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onDateTimePickerChange}
                />
            )}
            <Button
                onPress={onPressSave}
                title="Save"
                color="#841584"
                accessibilityLabel="Save activity"
                />
        </>
    );
};