package com.damiengo.trackandtag.entities

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.Ignore
import androidx.room.PrimaryKey
import java.time.LocalDateTime

@Entity
data class Tag(
    @PrimaryKey(autoGenerate = true) val tagId: Long,
    @ColumnInfo(name = "text") val title: String?,
    @ColumnInfo(name = "created_at") val createdAt: LocalDateTime?,
    @ColumnInfo(name = "updated_at") val updatedAt: LocalDateTime?
) {
    @Ignore
    constructor(text: String = "", createdAt: LocalDateTime? = ) : this(0, text, createdAt)
}
