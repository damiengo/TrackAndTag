package com.damiengo.trackandtag.ui.item

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.damiengo.trackandtag.R
import com.damiengo.trackandtag.database.TrackAndTagDatabase
import com.damiengo.trackandtag.entities.Activity
import kotlinx.android.synthetic.main.activity_item.*
import java.time.LocalDateTime

class ItemActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_item)

        val db = TrackAndTagDatabase(this)

        save_button.setOnClickListener { view ->
            val activity = Activity(
                
            )

            db.activityDao().insert()

            val toast = Toast.makeText(applicationContext, "Activity saved", Toast.LENGTH_SHORT)
            toast.show()
        }
    }
}
