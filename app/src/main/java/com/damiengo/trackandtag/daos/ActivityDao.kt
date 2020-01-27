package com.damiengo.trackandtag.daos

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import com.damiengo.trackandtag.entities.Activity

@Dao
interface ActivityDao {

    @Insert
    fun insert(activity: Activity)

    @Query("SELECT * FROM activity ORDER BY created_at DESC")
    fun getActivities(): Array<Activity>

}