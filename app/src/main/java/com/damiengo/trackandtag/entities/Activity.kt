package com.damiengo.trackandtag.entities

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.Ignore
import androidx.room.PrimaryKey
import java.time.LocalDateTime

@Entity
data class Activity(
    @PrimaryKey(autoGenerate = true) var activityId: Long,
    @ColumnInfo(name = "title") val title: String?,
    @ColumnInfo(name = "description") val description: String?,
    @ColumnInfo(name = "number") val number: Float?,
    @ColumnInfo(name = "made_at") val madeAt: LocalDateTime?,
    @ColumnInfo(name = "created_at") val createdAt: LocalDateTime?,
    @ColumnInfo(name = "updated_at") val updatedAt: LocalDateTime?
) {
    @RequiresApi(Build.VERSION_CODES.O)
    @Ignore
    constructor(title: String = "",
                description: String = "",
                number: Float? = 0f,
                madeAt: LocalDateTime = LocalDateTime.now(),
                createdAt: LocalDateTime? = LocalDateTime.now()) : this(0, title, description, number, madeAt, createdAt, null)
}