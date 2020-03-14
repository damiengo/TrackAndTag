package com.damiengo.trackandtag.ui.home

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.app.ActionBar
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.damiengo.trackandtag.R
import com.damiengo.trackandtag.db.ActivityDao
import com.damiengo.trackandtag.entity.ActivityWithTags
import com.damiengo.trackandtag.ui.item.ItemActivity
import dagger.android.AndroidInjection
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.content_main.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject

class MainActivity : AppCompatActivity() {

    private val scope = CoroutineScope(Dispatchers.Main)
    @Inject lateinit var dao : ActivityDao
    private lateinit var adapter : ActivityAdapter

    @SuppressLint("SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        AndroidInjection.inject(this)

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        initActionBar()
        manageLeftMenu()

        list_activities.layoutManager = LinearLayoutManager(this)
        list_activities.setHasFixedSize(true)

        loadActivities()

        fab.setOnClickListener {
            val intent = Intent(this@MainActivity, ItemActivity::class.java)
            startActivity(intent)
        }
    }

    override fun onResume() {
        super.onResume()
    }

    private fun loadActivities() {
        scope.launch(Dispatchers.IO) {
            val activities = dao.getActivitiesWithTags()
            adapter = ActivityAdapter(activities) { activityWTags: ActivityWithTags ->
                activityClicked(
                    activityWTags
                )
            }
            list_activities.adapter = adapter
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

    private fun activityClicked(activityWTags : ActivityWithTags) {
        val intent = Intent(this@MainActivity, ItemActivity::class.java)
        intent.putExtra("id", activityWTags.activity.activityId)
        startActivity(intent)
    }

    private fun initActionBar() {
        setSupportActionBar(toolbar)
        val actionbar: ActionBar? = supportActionBar
        actionbar?.apply {
            setDisplayHomeAsUpEnabled(true)
            setHomeButtonEnabled(true)
        }

        val actionBarDrawerToggle = ActionBarDrawerToggle(
            this, drawer_layout, toolbar,
            R.string.drawer_open, R.string.drawer_closed
        )
        drawer_layout.addDrawerListener(actionBarDrawerToggle)
        actionBarDrawerToggle.syncState()
    }

    private fun manageLeftMenu() {
        nav_view.setNavigationItemSelectedListener { menuItem ->
            Log.d("menu", menuItem.toString())

            true
        }
    }
}
