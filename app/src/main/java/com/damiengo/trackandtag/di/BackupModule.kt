package com.damiengo.trackandtag.di

import com.damiengo.trackandtag.backup.Export
import dagger.Module
import dagger.Provides
import javax.inject.Singleton

@Module
class BackupModule {

    @Singleton
    @Provides
    fun provideExport(): Export {
        return Export()
    }

}