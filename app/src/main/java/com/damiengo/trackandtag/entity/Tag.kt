package com.damiengo.trackandtag.entity

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.Ignore
import androidx.room.PrimaryKey

@Entity
data class Tag(
    @PrimaryKey(autoGenerate = true) var tagId: Long,
    @ColumnInfo val text: String?,
    @ColumnInfo val createdAt: Long,
    @ColumnInfo val updatedAt: Long
) {
    @RequiresApi(Build.VERSION_CODES.O)
    @Ignore
    constructor(text: String = "",
                createdAt: Long = System.currentTimeMillis()) : this(0, text, createdAt, 0)
}
