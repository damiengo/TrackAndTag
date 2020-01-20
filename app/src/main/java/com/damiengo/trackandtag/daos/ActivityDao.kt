package com.damiengo.trackandtag.daos

import androidx.room.Insert
import androidx.room.Query
import com.damiengo.trackandtag.entities.Activity

interface ActivityDao {

    @Insert
    fun insert(activity: Activity)

    @Query("SELECT * FROM activity ORDER BY created_at DESC")
    fun getAcivities(): Array<Activity>

}