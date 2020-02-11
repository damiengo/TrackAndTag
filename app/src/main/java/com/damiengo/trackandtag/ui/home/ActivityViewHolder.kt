package com.damiengo.trackandtag.ui.home

import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.damiengo.trackandtag.R
import com.damiengo.trackandtag.entities.Activity

class ActivityViewHolder(inflater: LayoutInflater, parent: ViewGroup) :
    RecyclerView.ViewHolder(inflater.inflate(R.layout.activity_list_item, parent, false)) {

    private var titleView: TextView = itemView.findViewById(R.id.activity_title)

    fun bind(activity: Activity) {
        titleView.text   = activity.title
    }

}