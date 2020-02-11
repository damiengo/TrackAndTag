package com.damiengo.trackandtag.ui.home

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.view.Menu
import android.view.MenuItem
import androidx.recyclerview.widget.LinearLayoutManager
import com.damiengo.trackandtag.R
import com.damiengo.trackandtag.database.TrackAndTagDatabase
import com.damiengo.trackandtag.ui.item.ItemActivity

import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.content_main.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {

    private val scope = CoroutineScope(Dispatchers.Main)

    @SuppressLint("SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolbar)

        val db = TrackAndTagDatabase(this)

        list_activities.layoutManager = LinearLayoutManager(this)
        list_activities.setHasFixedSize(true)

        scope.launch(Dispatchers.IO) {
            val activities = db.activityDao().getActivities()
            nb_activities.text = """${activities.size} activities"""

            val tags = db.activityDao().getTags()
            nb_tags.text = """${tags.size} tags"""

            val lastActivity = activities[0]
            last_activity.text = """${lastActivity.title} ${lastActivity.number}"""

            val lastActivity1 = activities[1]
            last_activity_1.text = """${lastActivity1.title} ${lastActivity1.number}"""
        }

        fab.setOnClickListener { view ->
            val intent = Intent(this@MainActivity, ItemActivity::class.java)
            startActivity(intent)
        }
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.menu_main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        return when (item.itemId) {
            R.id.action_settings -> true
            else -> super.onOptionsItemSelected(item)
        }
    }
}
