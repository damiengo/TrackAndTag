package com.damiengo.trackandtag.di

import com.damiengo.trackandtag.ui.home.MainActivity
import com.damiengo.trackandtag.ui.item.ItemActivity
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class ActivitiesModule {

    @ContributesAndroidInjector
    abstract fun provideMainActivity(): MainActivity

    @ContributesAndroidInjector
    abstract fun provideItemActivity(): ItemActivity

}