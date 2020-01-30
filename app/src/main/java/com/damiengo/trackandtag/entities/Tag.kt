package com.damiengo.trackandtag.entities

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.Ignore
import androidx.room.PrimaryKey
import java.time.LocalDateTime

@Entity
data class Tag(
    @PrimaryKey(autoGenerate = true) var tagId: Long,
    @ColumnInfo(name = "text") val title: String?,
    @ColumnInfo(name = "created_at") val createdAt: LocalDateTime?,
    @ColumnInfo(name = "updated_at") val updatedAt: LocalDateTime?
) {
    @RequiresApi(Build.VERSION_CODES.O)
    @Ignore
    constructor(text: String = "",
                createdAt: LocalDateTime? = LocalDateTime.now()) : this(0, text, createdAt, null)
}
