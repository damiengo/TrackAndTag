package com.damiengo.trackandtag.entities

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.Ignore
import java.time.LocalDateTime

@Entity(primaryKeys = ["activity_id", "tag_id"])
data class ActivityTag(
    @ColumnInfo(name = "activity_id") val activityId: Long,
    @ColumnInfo(name = "tag_id") val tagId: Long,
    @ColumnInfo(name = "created_at") val createdAt: Long,
    @ColumnInfo(name = "updated_at") val updatedAt: Long
) {
    @RequiresApi(Build.VERSION_CODES.O)
    @Ignore
    constructor(activityId: Long = 0,
                tagId: Long = 0,
                createdAt: Long = System.currentTimeMillis()) : this(activityId, tagId, createdAt, 0)
}
