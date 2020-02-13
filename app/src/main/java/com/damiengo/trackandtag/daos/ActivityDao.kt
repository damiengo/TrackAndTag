package com.damiengo.trackandtag.daos

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Transaction
import com.damiengo.trackandtag.entities.Activity
import com.damiengo.trackandtag.entities.ActivityTag
import com.damiengo.trackandtag.entities.ActivityWithTags
import com.damiengo.trackandtag.entities.Tag

@Dao
interface ActivityDao {

    @Insert
    suspend fun insert(activity: Activity): Long

    @Insert
    suspend fun insert(activityTag: ActivityTag): Long

    @Insert
    suspend fun insert(tag: Tag): Long

    @Transaction
    @Query("SELECT * FROM activity ORDER BY madeAt DESC")
    suspend fun getActivitiesWithTags(): List<ActivityWithTags>

    @Query("SELECT * FROM tag ORDER BY createdAt DESC")
    suspend fun getTags(): List<Tag>

    @Query("SELECT * FROM tag WHERE text = :text")
    suspend fun findTagByText(text: String): List<Tag>

}