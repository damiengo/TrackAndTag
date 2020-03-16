package com.damiengo.trackandtag.backup

import com.damiengo.trackandtag.repository.ActivityRepository
import java.io.File
import javax.inject.Inject

class Export {

    @Inject
    lateinit var repository : ActivityRepository

    fun allIn(folderName: String) {
        val folder = File(folderName)
        folder.mkdirs()

        val file = File(folder, "export.csv")

        val activities = repository.getActivities()

        activities.forEach {

        }

    }

}