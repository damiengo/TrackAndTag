package com.damiengo.trackandtag.entity

import androidx.room.Embedded
import androidx.room.Junction
import androidx.room.Relation

data class ActivityWithTags(
    @Embedded val activity : Activity,
    @Relation(
        parentColumn = "activityId",
        entityColumn = "tagId",
        associateBy = Junction(ActivityTag::class)
    )
    val tags: List<Tag>
)
