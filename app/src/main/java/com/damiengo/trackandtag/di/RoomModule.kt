package com.damiengo.trackandtag.di

import android.app.Application
import androidx.room.Room
import com.damiengo.trackandtag.db.ActivityDao
import com.damiengo.trackandtag.db.TrackAndTagDatabase
import com.damiengo.trackandtag.repository.ActivityRepository
import dagger.Module
import dagger.Provides
import javax.inject.Singleton

@Module
class RoomModule {

    @Singleton
    @Provides
    fun provideDb(app: Application): TrackAndTagDatabase {
        return Room.databaseBuilder(app,
                TrackAndTagDatabase::class.java, "track-and-tag.db")
                //.fallbackToDestructiveMigration() // @todo remove when prod
                .build()
    }

    @Singleton
    @Provides
    fun provideActivityDao(db: TrackAndTagDatabase): ActivityDao {
        return db.activityDao()
    }

    @Singleton
    @Provides
    fun provideActivityRepository(): ActivityRepository {
        return ActivityRepository()
    }

}