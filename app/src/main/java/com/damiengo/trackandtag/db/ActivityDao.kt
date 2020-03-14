package com.damiengo.trackandtag.db

import androidx.room.*
import com.damiengo.trackandtag.entity.Activity
import com.damiengo.trackandtag.entity.ActivityTag
import com.damiengo.trackandtag.entity.ActivityWithTags
import com.damiengo.trackandtag.entity.Tag


@Dao
interface ActivityDao {

    @Transaction
    @Insert
    suspend fun insert(activity: Activity): Long

    @Transaction
    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun insert(activityTag: ActivityTag): Long

    @Transaction
    @Update
    suspend fun update(activityTag: ActivityTag)

    @Transaction
    @Insert
    suspend fun insert(tag: Tag): Long

    @Transaction
    @Update
    suspend fun update(activity: Activity)

    @Transaction
    @Delete
    suspend fun delete(activity: Activity)

    @Transaction
    @Query("DELETE FROM activity WHERE activityId = :id")
    suspend fun deleteActivityById(id: Long)

    @Transaction
    @Query("DELETE FROM activityTag WHERE activityId = :id")
    suspend fun deleteActivityTagByActivityId(id: Long)

    @Transaction
    suspend fun upsert(activityTag: ActivityTag) {
        val id: Long = insert(activityTag)
        if (id == -1L) {
            activityTag.updatedAt = System.currentTimeMillis()
            update(activityTag)
        }
    }

    @Transaction
    @Query("SELECT * FROM activity WHERE activityId = :id LIMIT 1")
    suspend fun getActivityWithTagById(id: Long): ActivityWithTags

    @Transaction
    @Query("SELECT * FROM activity ORDER BY madeAt DESC")
    suspend fun getActivitiesWithTags(): List<ActivityWithTags>

    @Transaction
    @Query("SELECT * FROM tag ORDER BY createdAt DESC")
    suspend fun getTags(): List<Tag>

    @Transaction
    @Query("SELECT * FROM tag WHERE text = :text")
    suspend fun findTagByText(text: String): List<Tag>

}