package com.damiengo.trackandtag.entity

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.Ignore
import androidx.room.PrimaryKey

@Entity
data class Activity(
    @PrimaryKey(autoGenerate = true) var activityId: Long,
    @ColumnInfo val title: String?,
    @ColumnInfo val description: String?,
    @ColumnInfo val number: Float?,
    @ColumnInfo val madeAt: Long,
    @ColumnInfo val createdAt: Long,
    @ColumnInfo val updatedAt: Long
) {
    @RequiresApi(Build.VERSION_CODES.O)
    @Ignore
    constructor(title: String = "",
                description: String = "",
                number: Float? = 0f,
                madeAt: Long = System.currentTimeMillis(),
                createdAt: Long = System.currentTimeMillis()) : this(0, title, description, number, madeAt, createdAt, 0)
}