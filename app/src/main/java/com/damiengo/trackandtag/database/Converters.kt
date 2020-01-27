package com.damiengo.trackandtag.database

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.room.TypeConverter
import java.time.LocalDateTime

class Converters {

    @TypeConverter
    fun localDateTimeToString(value: LocalDateTime) = value.toString()

    @RequiresApi(Build.VERSION_CODES.O)
    @TypeConverter
    fun localDateTimeFromString(value: String) = LocalDateTime.parse(value)

}