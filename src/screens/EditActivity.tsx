import React, { useState, useEffect } from 'react'
import { TextInput, Button, Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Moment from 'moment'
import { RouteProp } from '@react-navigation/native'

import { Activity } from '../entities/Activity'
import { Tag } from '../entities/Tag'
import { ActivityTag } from '../entities/ActivityTag'
import { api } from '../services/api/LocalApi'

export default function EditActivityScreen({ navigation, route }: any) {

    const genActivity = () => {
        const activity = new Activity()
        activity.title = ''
        activity.description = ''
        activity.quantity = 0
        activity.madeAt = Date.now()
        activity.createdAt = Date.now()
        activity.activityTags = []
        return activity
    }

    const formatDate = (date: number) => {
        //Moment.locale(RNLocalize.findBestAvailableLanguage().languageTag)
        return Moment(new Date(date)).format('DD/MM/yyyy')
    }

    let item: Activity = genActivity()
    if(route.params) {
        item = {...item, ...route.params.item}
    }

    const [id, setId]                         = useState(item.id);
    const [madeAt, setMadeAt]                 = useState(item.madeAt);
    const [tags, setTags]                     = useState(item.tagsLabels);
    const [title, setTitle]                   = useState(item.title);
    const [description, setDescription]       = useState(item.description);
    const [quantity, setQuantity]             = useState(item.quantity);
    const [createdAt, setCreatedAt]           = useState(item.createdAt);
    const [updatedAt, setUpdatedAt]           = useState(item.updatedAt);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isNew, setIsNew]                   = useState((item.id)? false : true);

    if( isNew ) {
        navigation.setOptions({ title: 'New activity' })
    }

    const onDateTimePickerChange = (event: React.FormEvent<EventTarget>, value: any) => {
        setShowDatePicker(false)
        setMadeAt(value.getTime() || Date.now())
    }

    const genTagsArray = (activity: Activity): ActivityTag[] => {
        return tags.split(' ').map((tag: string) => {
            const eTag = new Tag()
            eTag.label = tag
            const eActivityTag = new ActivityTag()
            eActivityTag.activity = activity
            eActivityTag.tag = eTag
            return eActivityTag
        })
    }

    const onPressSave = async (event: React.FormEvent<EventTarget>) => {
        const activity = new Activity()
        activity.id = id
        activity.title = title
        activity.description = description
        activity.quantity = quantity
        activity.madeAt = madeAt
        activity.activityTags = genTagsArray(activity)
        activity.createdAt = createdAt
        activity.updatedAt = updatedAt
        await api.addActivity(activity)
        navigation.goBack()
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

    const formatQuantity = (value: string) : number => {
        if(value == '') {
            return 0
        }
        return parseInt(value)
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
            onChangeText={text => setQuantity(formatQuantity(text))}
            defaultValue={String(quantity)}
            testID="input_number"
           />
           <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder='Date'
            defaultValue={formatDate(madeAt)}
            onFocus={() => setShowDatePicker(true)}
            testID="input_date"
           />
           {showDatePicker && (
            <DateTimePicker
                testID="dateTimePicker"
                value={new Date(madeAt)}
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