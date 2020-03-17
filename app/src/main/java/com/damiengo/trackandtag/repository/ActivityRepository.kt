package com.damiengo.trackandtag.repository

import com.damiengo.trackandtag.db.ActivityDao
import com.damiengo.trackandtag.entity.ActivityWithTags
import javax.inject.Inject

class ActivityRepository
{

    @Inject
    lateinit var dao : ActivityDao

    fun getActivities(): MutableList<ActivityWithTags> {
        val data = mutableListOf<ActivityWithTags>()

        return data
    }

}