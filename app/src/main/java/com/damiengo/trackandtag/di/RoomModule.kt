package com.damiengo.trackandtag.di

import androidx.room.Room
import com.damiengo.trackandtag.TrackAndTagApp
import com.damiengo.trackandtag.db.ActivityDao
import com.damiengo.trackandtag.db.TrackAndTagDatabase
import dagger.Module
import dagger.Provides
import javax.inject.Singleton

@Module
class RoomModule {

    @Singleton
    @Provides
    fun provideDb(app: TrackAndTagApp): TrackAndTagDatabase {
        return Room.databaseBuilder(app,
                TrackAndTagDatabase::class.java, "track-and-tag.db")
                //.fallbackToDestructiveMigration() // @todo remove when prod
                .build()
    }

    @Singleton
    @Provides
    fun provideUserDao(db: TrackAndTagDatabase): ActivityDao {
        return db.activityDao()
    }

}