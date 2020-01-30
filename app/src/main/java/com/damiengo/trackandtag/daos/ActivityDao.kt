package com.damiengo.trackandtag.daos

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import com.damiengo.trackandtag.entities.Activity
import com.damiengo.trackandtag.entities.ActivityTag
import com.damiengo.trackandtag.entities.Tag

@Dao
interface ActivityDao {

    @Insert
    suspend fun insert(activity: Activity): Long

    @Insert
    suspend fun insert(activityTag: ActivityTag): Long

    @Insert
    suspend fun insert(tag: Tag): Long

    @Query("SELECT * FROM activity ORDER BY created_at DESC")
    suspend fun getActivities(): Array<Activity>

    @Query("SELECT * FROM tag WHERE text = :text")
    suspend fun findTagByText(text: String): List<Tag>

}