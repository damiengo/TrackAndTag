package com.damiengo.trackandtag.entities

import androidx.room.ColumnInfo
import androidx.room.Entity
import java.time.LocalDateTime

@Entity(primaryKeys = arrayOf("activityId", "tagId"))
data class ActivityTag(
    @ColumnInfo(name = "activity_id") val activityId: Long,
    @ColumnInfo(name = "tag_id") val tagId: Long,
    @ColumnInfo(name = "created_at") val createdAt: LocalDateTime?,
    @ColumnInfo(name = "updated_at") val updatedAt: LocalDateTime?
)
