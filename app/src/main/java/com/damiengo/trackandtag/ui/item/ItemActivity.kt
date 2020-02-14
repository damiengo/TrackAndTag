package com.damiengo.trackandtag.ui.item

import com.damiengo.trackandtag.R
import android.app.AlertDialog
import android.os.Build
import android.os.Bundle
import android.widget.DatePicker
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.damiengo.trackandtag.database.TrackAndTagDatabase
import com.damiengo.trackandtag.entities.Activity
import com.damiengo.trackandtag.entities.ActivityTag
import com.damiengo.trackandtag.entities.Tag
import kotlinx.android.synthetic.main.activity_item.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.util.*


class ItemActivity : AppCompatActivity() {

    private val scope = CoroutineScope(Dispatchers.Main)

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_item)

        val db = TrackAndTagDatabase(this)
        val dao = db.activityDao()

        val editActivityId = intent.getLongExtra("id", -1)

        // Init fields if editing
        if(editActivityId > 0) {
            scope.launch(Dispatchers.IO) {
                val activityWTags = dao.getActivityWithTagById(editActivityId)
                if(activityWTags.activity.activityId > 0) {
                    item_title.setText(activityWTags.activity.title)
                    item_description.setText(activityWTags.activity.description)
                    item_number.setText("%.0f".format(activityWTags.activity.number))
                    item_tags.setText(activityWTags.tags.joinToString(separator = " ") { "${it.text}" })
                    val madeAt = activityWTags.activity.madeAt
                    val calendar = Calendar.getInstance()
                    calendar.timeInMillis = madeAt
                    val year = calendar.get(Calendar.YEAR)
                    val month = calendar.get(Calendar.MONTH)
                    val day = calendar.get(Calendar.DAY_OF_MONTH)
                    item_date.updateDate(year, month, day)
                }
            }
        }

        save_button.setOnClickListener {
            scope.launch(Dispatchers.IO) {
                val tags = mutableListOf<Tag>()
                // Saving differents tags
                item_tags.text.toString().split(" ").forEach {
                    val tag: Tag
                    val tagValue = it.toLowerCase(Locale.ENGLISH)
                    val tagsFound = dao.findTagByText(tagValue)

                    if (tagsFound.isNotEmpty()) {
                        tag = tagsFound[0]
                    } else {
                        tag = Tag(tagValue)
                        val tagId = dao.insert(tag)
                        tag.tagId = tagId
                    }
                    tags.add(tag)
                }

                // Activity
                val activity = Activity(
                    item_title.text.toString(),
                    item_description.text.toString(),
                    item_number.text.toString().toFloat(),
                    getDateFromDatePicker(item_date)
                )

                if(editActivityId > 0) {
                    activity.activityId = editActivityId
                    dao.update(activity)
                }
                else {
                    val activityId = dao.insert(activity)
                    activity.activityId = activityId
                }

                // Tag / Activity
                tags.forEach {
                    val activityTag = ActivityTag(
                        activity.activityId,
                        it.tagId
                    )
                    dao.upsert(activityTag)
                }

                withContext(Dispatchers.Main) {
                    val toast =
                        Toast.makeText(applicationContext, "Activity saved", Toast.LENGTH_SHORT)
                    toast.show()
                    finish()
                }
            }
        }

        delete_button.setOnClickListener {
            val builder = AlertDialog.Builder(this)
            builder.setTitle("Deleting activity ?")

            builder.setPositiveButton("Yes") { dialog, which ->
                scope.launch(Dispatchers.IO) {
                    dao.deleteActivityTagByActivityId(editActivityId)
                    dao.deleteActivityById(editActivityId)
                    withContext(Dispatchers.Main) {
                        val toast =
                            Toast.makeText(
                                applicationContext,
                                "Activity deleted",
                                Toast.LENGTH_SHORT
                            )
                        toast.show()
                        finish()
                    }
                }
            }
            builder.setNegativeButton("No"){ dialog,which ->
                Toast.makeText(applicationContext,"No deletion",Toast.LENGTH_SHORT).show()
            }
            builder.show()
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    fun getDateFromDatePicker(datePicker: DatePicker): Long {
        val day = datePicker.dayOfMonth
        val month = datePicker.month
        val year = datePicker.year
        val calendar = Calendar.getInstance()
        calendar[year, month] = day
        return calendar.timeInMillis
    }
}
