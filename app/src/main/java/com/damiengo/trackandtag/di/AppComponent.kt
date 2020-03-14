package com.damiengo.trackandtag.di

import android.app.Application
import com.damiengo.trackandtag.TrackAndTagApp
import com.damiengo.trackandtag.ui.home.MainActivity
import dagger.BindsInstance
import dagger.Component
import dagger.android.AndroidInjectionModule
import javax.inject.Singleton

@Singleton
@Component(
    modules = [
        AndroidInjectionModule::class,
        ActivitiesModule::class,
        RoomModule::class
    ]
)
interface AppComponent {

    fun inject(app: TrackAndTagApp)

    @Component.Factory
    interface Factory {
        fun create(@BindsInstance application: Application): AppComponent
    }

    fun inject(activity: MainActivity)

}