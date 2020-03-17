package com.damiengo.trackandtag.backup

import com.damiengo.trackandtag.entity.ActivityWithTags
import com.damiengo.trackandtag.repository.ActivityRepository
import java.io.File
import java.text.SimpleDateFormat
import java.util.*
import javax.inject.Inject

class Export {

    @Inject
    lateinit var repository : ActivityRepository

    fun allIn(folderName: String) {
        val file = createFileIn(folderName)
        val activities = repository.getActivities()

        activities.forEach { awt: ActivityWithTags ->
            val activity = awt.activity
            val tags = awt.tags
            val tagsConcat = tags.joinToString(separator = "|") { "${it.text}" }
            file.appendText("'${activity.title}','${activity.description}',${activity.madeAt},${activity.number},${activity.createdAt},${activity.updatedAt},'${tagsConcat}'\n")
        }
    }

    private fun createFileIn(folderName: String) : File {
        val folder = File(folderName)
        folder.mkdirs()

        val sdf = SimpleDateFormat("yyyyMMdd", Locale.ENGLISH)
        val currentDate = sdf.format(Date())

        return File(folder, "export_${currentDate}.csv")
    }

}