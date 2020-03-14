package com.damiengo.trackandtag.db

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.damiengo.trackandtag.entity.Activity
import com.damiengo.trackandtag.entity.ActivityTag
import com.damiengo.trackandtag.entity.Tag

@Database(entities = [Activity::class, ActivityTag::class, Tag::class], version = 3)
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
            //.fallbackToDestructiveMigration() // @todo remove when prod
            .build()
    }

}
