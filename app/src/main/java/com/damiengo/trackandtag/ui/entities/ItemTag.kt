package com.damiengo.trackandtag.ui.entities

import androidx.room.ColumnInfo
import androidx.room.Entity
import java.time.LocalDateTime

@Entity(primaryKeys = arrayOf("itemId", "tagId"))
data class ItemTag(
    @ColumnInfo(name = "item_id") val itemId: Int,
    @ColumnInfo(name = "tag_id") val tagId: Int,
    @ColumnInfo(name = "created_at") val createdAt: LocalDateTime?,
    @ColumnInfo(name = "updated_at") val updatedAt: LocalDateTime?
)
