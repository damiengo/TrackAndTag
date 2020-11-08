import React, { useState, useEffect } from 'react'
import { TextInput, Button, Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Moment from 'moment'
import { RouteProp } from '@react-navigation/native'

import { Tag } from '../entities/Tag'

export default function EditActivityScreen({ navigation, route }: any) {

    const genTags = (tags: Tag) => {
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
                        number: '', 
                        createdAt: (new Date()).getTime(), 
                        updatedAt: (new Date()).getTime() 
                    } 
                }

    const [date, setDate]                     = useState(item.date);
    const [tags, setTags]                     = useState(genTags(item.tags));
    const [title, setTitle]                   = useState(item.title);
    const [description, setDescription]       = useState(item.description);
    const [number, setNumber]                 = useState(item.number);
    const [createdAt, setCreatedAt]           = useState(item.createdAt);
    const [updatedAt, setUpdatedAt]           = useState(item.updatedAt);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isNew, setIsNew]                   = useState((route.params)? false : true);

    if( isNew ) {
        navigation.setOptions({ title: 'New activity' })
    }

    const formatDate = (date: number) => {
        //Moment.locale(RNLocalize.findBestAvailableLanguage().languageTag)
        return Moment(new Date(date)).format('DD/MM/yyyy')
    }

    const onDateTimePickerChange = (event: React.FormEvent<EventTarget>, value: any) => {
        setShowDatePicker(false)
        setDate(value || (new Date()).getTime())
    }

    const onPressSave = async (event: React.FormEvent<EventTarget>) => {
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
            /* await AsyncStorage.getItem('@activities')
            .then(async (activities) => {
                var a = activities ? JSON.parse(activities) : {}
                const key = activity.createdAt
                a[key] = activity
                await AsyncStorage.setItem('@activities', JSON.stringify(a))
                navigation.goBack()
            }) */
        } catch (e) {
            console.error(e);
        }
    }

    const onPressDelete = async (event: React.FormEvent<EventTarget>) => {
        Alert.alert(
            "Delete activity",
            "Do you really want to delete "+title+" ?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", 
                    onPress: () => console.log("OK Pressed") 
                }
            ],
            { cancelable: false }
        )
    }

    return (
        <>
           <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder='Tags'
            autoCapitalize='none'
            onChangeText={text => setTags(text)}
            defaultValue={tags}
            testID="input_tags"
           />
           <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder='Title'
            onChangeText={text => setTitle(text)}
            defaultValue={title}
            testID="input_title"
           />
           <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder='Description'
            onChangeText={text => setDescription(text)}
            defaultValue={description}
            testID="input_description"
           />
           <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder='Number'
            keyboardType='numeric'
            onChangeText={text => setNumber(text)}
            defaultValue={String(number)}
            testID="input_number"
           />
           <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder='Date'
            defaultValue={formatDate(date)}
            onFocus={() => setShowDatePicker(true)}
            testID="input_date"
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
                testID="button_save"
                />
            {!isNew &&<Button
                onPress={onPressDelete}
                title="Delete"
                color="#d35400"
                accessibilityLabel="Delete activity"
                testID="button_delete"
                />}
        </>
    );
};