package com.damiengo.trackandtag.repository

import com.damiengo.trackandtag.db.ActivityDao
import com.damiengo.trackandtag.entity.Activity
import javax.inject.Inject

class ActivityRepository
{

    @Inject
    lateinit var dao : ActivityDao

    fun getActivities(): MutableList<Activity> {
        val data = mutableListOf<Activity>()



        return data
    }

}