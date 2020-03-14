package com.damiengo.trackandtag

import android.app.Application
import com.damiengo.trackandtag.di.DaggerAppComponent

class TrackAndTagApp : Application() {

    val appComponent = DaggerAppComponent.create()

}