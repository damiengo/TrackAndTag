package com.damiengo.trackandtag.ui.item

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.damiengo.trackandtag.R
import kotlinx.android.synthetic.main.activity_item.*

class ItemActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_item)

        save_button.setOnClickListener { view ->

        }
    }
}
