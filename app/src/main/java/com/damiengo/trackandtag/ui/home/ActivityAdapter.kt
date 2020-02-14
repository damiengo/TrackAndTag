package com.damiengo.trackandtag.ui.home

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.damiengo.trackandtag.entities.Activity
import com.damiengo.trackandtag.entities.ActivityWithTags

class ActivityAdapter(private var activities: List<ActivityWithTags>,
                      private val clickListener: (ActivityWithTags) -> Unit) : RecyclerView.Adapter<ActivityViewHolder>() {

    private lateinit var context: Context

    // Must be quick, on the main thread
    override fun onCreateViewHolder(parent: ViewGroup,
                                    viewType: Int): ActivityViewHolder {
        context = parent.context

        val inflater = LayoutInflater.from(context)
        return ActivityViewHolder(inflater, parent)
    }

    // Must be quick, on the main thread
    override fun onBindViewHolder(holder: ActivityViewHolder, position: Int) {
        val activity: ActivityWithTags = activities[position]

        holder.bind(activity, clickListener)
    }

    override fun getItemCount(): Int = activities.size

    override fun getItemId(position: Int): Long {
        return activities[position].hashCode().toLong()
    }

    fun updateActivities(_activities: List<ActivityWithTags>) {
        activities = _activities
    }

}