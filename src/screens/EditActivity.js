import React, { useState, useEffect } from 'react'
import { TextInput, Button } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage';

export default function EditActivityScreen({ navigation, route, item }) {
    const [date, setDate] = useState(new Date());
    const [tags, setTags] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [number, setNumber] = useState("0");
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        if( ! route.params) {
            return
        }
        const { item } = route.params
        if(item) {
            setDate(item.date)
            setTags(genTags(item.tags))
            setTitle(item.title)
            setDescription(item.description)
            setNumber(item.number)
        }
    });

    const genTags = (tags) => {
        return Object.values(tags).map((tag) => {
            return tag
        }).join(' ')
    }

    const formatDate = (date) => {
        Moment.locale('fr')
        return Moment(date).format('DD/MM/yyyy')
    }

    const onDateTimePickerChange = (event, value) => {
        setDate(value || new Date())
        setShowDatePicker(false)
    }

    const onPressSave = async (event) => {
        console.log('save')
        try {
            const activity = {
                tags: tags.split(' '), 
                title: title, 
                description: description, 
                number: number, 
                date: date
            }
            await AsyncStorage.getItem('@activities')
            .then((activities) => {
                const a = activities ? JSON.parse(activities) : []
                a.push(activity)
                AsyncStorage.setItem('@activities', JSON.stringify(a))
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
            defaultValue={number}
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