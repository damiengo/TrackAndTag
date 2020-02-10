package com.damiengo.trackandtag.entities

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.Ignore
import androidx.room.PrimaryKey

@Entity
data class Activity(
    @PrimaryKey(autoGenerate = true) var activityId: Long,
    @ColumnInfo(name = "title") val title: String?,
    @ColumnInfo(name = "description") val description: String?,
    @ColumnInfo(name = "number") val number: Float?,
    @ColumnInfo(name = "made_at") val madeAt: Long,
    @ColumnInfo(name = "created_at") val createdAt: Long,
    @ColumnInfo(name = "updated_at") val updatedAt: Long
) {
    @RequiresApi(Build.VERSION_CODES.O)
    @Ignore
    constructor(title: String = "",
                description: String = "",
                number: Float? = 0f,
                madeAt: Long = System.currentTimeMillis(),
                createdAt: Long = System.currentTimeMillis()) : this(0, title, description, number, madeAt, createdAt, 0)
}