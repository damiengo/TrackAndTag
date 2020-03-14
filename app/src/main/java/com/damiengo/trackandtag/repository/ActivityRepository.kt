package com.damiengo.trackandtag.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.damiengo.trackandtag.entity.Activity

class ActivityRepository
{

    fun getActivities(): LiveData<Activity> {
        val data = MutableLiveData<Activity>()

        return data
    }

}