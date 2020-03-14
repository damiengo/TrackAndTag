package com.damiengo.trackandtag.ui.home

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.damiengo.trackandtag.R
import com.damiengo.trackandtag.entity.ActivityWithTags
import java.text.SimpleDateFormat
import java.util.*

class ActivityViewHolder(inflater: LayoutInflater, parent: ViewGroup) :
    RecyclerView.ViewHolder(inflater.inflate(R.layout.activity_list_item, parent, false)) {

    private var titleView: TextView = itemView.findViewById(R.id.activity_title)
    private var numberView: TextView = itemView.findViewById(R.id.activity_number)
    private var dateView: TextView = itemView.findViewById(R.id.activity_date)
    private var tagsView: TextView = itemView.findViewById(R.id.activity_tags)

    @SuppressLint("SetTextI18n")
    fun bind(activityWTags: ActivityWithTags, clickListener: (ActivityWithTags) -> Unit) {
        val activity = activityWTags.activity
        titleView.text = activity.title
        numberView.text = "%.0f".format(activity.number)
        val sdf = SimpleDateFormat("dd/MM", Locale.ENGLISH)
        dateView.text = sdf.format(activity.madeAt)
        tagsView.text = activityWTags.tags.joinToString(separator = " • ") { "#${it.text}" }

        itemView.setOnClickListener { clickListener(activityWTags)}
    }

}