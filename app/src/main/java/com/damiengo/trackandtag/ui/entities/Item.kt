package com.damiengo.trackandtag.ui.entities

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import java.time.LocalDateTime

@Entity
data class Item(
    @PrimaryKey val uid: Int,
    @ColumnInfo(name = "title") val title: String?,
    @ColumnInfo(name = "description") val description: String?,
    @ColumnInfo(name = "created_at") val createdAt: LocalDateTime?,
    @ColumnInfo(name = "updated_at") val updatedAt: LocalDateTime?
)
