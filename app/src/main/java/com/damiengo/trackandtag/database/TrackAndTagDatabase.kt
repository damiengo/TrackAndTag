package com.damiengo.trackandtag.database

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.damiengo.trackandtag.daos.ActivityDao
import com.damiengo.trackandtag.entities.Activity
import com.damiengo.trackandtag.entities.ActivityTag
import com.damiengo.trackandtag.entities.Tag

@Database(entities = arrayOf(Activity::class, ActivityTag::class, Tag::class), version = 1)
abstract class TrackAndTagDatabase : RoomDatabase() {

    abstract fun activityDao(): ActivityDao

    companion object {
        @Volatile private var instance: TrackAndTagDatabase? = null
        private val LOCK = Any()

        operator fun invoke(context: Context)= instance ?: synchronized(LOCK){
            instance ?: buildDatabase(context).also { instance = it}
        }

        private fun buildDatabase(context: Context) = Room.databaseBuilder(context,
            TrackAndTagDatabase::class.java, "track-and-tag.db")
            .build()
    }

}
