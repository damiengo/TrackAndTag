package com.damiengo.trackandtag.ui.home

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.damiengo.trackandtag.entities.Activity
import com.damiengo.trackandtag.entities.ActivityWithTags

class ActivityAdapter(_activities: List<ActivityWithTags>) : RecyclerView.Adapter<ActivityViewHolder>() {

    private lateinit var context: Context
    private var activities : List<ActivityWithTags>

    init {
        activities = _activities
    }

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

        holder.bind(activity)
    }

    override fun getItemCount(): Int = activities.size

    override fun getItemId(position: Int): Long {
        return activities[position].hashCode().toLong()
    }

    fun updateActivities(data: List<ActivityWithTags>) {
        activities = data
        notifyDataSetChanged()
    }

}