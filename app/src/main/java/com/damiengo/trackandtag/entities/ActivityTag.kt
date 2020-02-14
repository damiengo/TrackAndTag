package com.damiengo.trackandtag.entities

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.Ignore
import androidx.room.Index
import java.time.LocalDateTime

@Entity(primaryKeys = ["activityId", "tagId"],
        indices = [Index(value = ["tagId"])]
)
data class ActivityTag(
    @ColumnInfo val activityId: Long,
    @ColumnInfo val tagId: Long,
    @ColumnInfo val createdAt: Long,
    @ColumnInfo var updatedAt: Long
) {
    @RequiresApi(Build.VERSION_CODES.O)
    @Ignore
    constructor(activityId: Long = 0,
                tagId: Long = 0,
                createdAt: Long = System.currentTimeMillis()) : this(activityId, tagId, createdAt, 0)
}
