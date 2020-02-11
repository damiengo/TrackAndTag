package com.damiengo.trackandtag.ui.home

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.damiengo.trackandtag.entities.Activity

class ActivityAdapter : RecyclerView.Adapter<ActivityViewHolder>() {

    private lateinit var context: Context
    private lateinit var activities : List<Activity>

    // Must be quick, on the main thread
    override fun onCreateViewHolder(parent: ViewGroup,
                                    viewType: Int): ActivityViewHolder {
        context = parent.context
        activities = mutableListOf()

        val inflater = LayoutInflater.from(context)
        return ActivityViewHolder(inflater, parent)
    }

    // Must be quick, on the main thread
    override fun onBindViewHolder(holder: ActivityViewHolder, position: Int) {
        val activity: Activity = activities[position]

        holder.bind(activity)
    }

    override fun getItemCount(): Int = activities.size

    override fun getItemId(position: Int): Long {
        return activities[position].hashCode().toLong()
    }

}