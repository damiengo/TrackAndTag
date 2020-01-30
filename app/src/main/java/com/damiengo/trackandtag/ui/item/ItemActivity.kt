package com.damiengo.trackandtag.ui.item

import android.os.Build
import android.os.Bundle
import android.widget.DatePicker
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.damiengo.trackandtag.R
import com.damiengo.trackandtag.database.TrackAndTagDatabase
import com.damiengo.trackandtag.entities.Activity
import com.damiengo.trackandtag.entities.ActivityTag
import com.damiengo.trackandtag.entities.Tag
import kotlinx.android.synthetic.main.activity_item.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.time.LocalDateTime
import java.util.*

class ItemActivity : AppCompatActivity() {

    private val scope = CoroutineScope(Dispatchers.Main)

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_item)

        val db = TrackAndTagDatabase(this)

        save_button.setOnClickListener {
            scope.launch(Dispatchers.IO) {
                val tags = mutableListOf<Tag>()
                item_tags.text.toString().split(" ").forEach {
                    val tag: Tag
                    val tagValue = it.toLowerCase(Locale.ENGLISH)
                    val tagsFound = db.activityDao().findTagByText(tagValue)

                    if (tagsFound.isNotEmpty()) {
                        tag = tagsFound[0]
                    } else {
                        tag = Tag(tagValue)
                        val tagId = db.activityDao().insert(tag)
                        tag.tagId = tagId
                    }
                    tags.add(tag)
                }

                val activity = Activity(
                    item_title.text.toString(),
                    item_description.text.toString(),
                    item_number.text.toString().toFloat(),
                    getDateFromDatePicker(item_date)!!
                )

                val activityId = db.activityDao().insert(activity)
                activity.activityId = activityId

                tags.forEach {
                    val activityTag = ActivityTag(
                        activity.activityId,
                        it.tagId
                    )
                    db.activityDao().insert(activityTag)
                }

                val toast = Toast.makeText(applicationContext, "Activity saved", Toast.LENGTH_SHORT)
                toast.show()
            }
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    fun getDateFromDatePicker(datePicker: DatePicker): LocalDateTime? {
        val day = datePicker.dayOfMonth
        val month = datePicker.month
        val year = datePicker.year
        val calendar = Calendar.getInstance()
        calendar[year, month] = day
        return LocalDateTime.ofInstant(calendar.toInstant(), calendar.timeZone.toZoneId())
    }
}
