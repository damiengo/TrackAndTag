package com.damiengo.trackandtag.backup

import com.damiengo.trackandtag.entity.Activity
import com.damiengo.trackandtag.entity.ActivityWithTags
import com.damiengo.trackandtag.entity.Tag
import com.damiengo.trackandtag.repository.ActivityRepository
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.mockito.Mockito.*
import java.io.File
import java.text.SimpleDateFormat
import java.util.*

class ExportTest {

    private val export  = Export()

    @Before
    fun setUp() {
        val mockRepo: ActivityRepository = mock(ActivityRepository::class.java)
        `when`(mockRepo.getActivities()).thenReturn(fakeActivitiesWithTags())

        export.repository = mockRepo
    }

    @Test
    fun export_fullData_Ok() {
        val sdf = SimpleDateFormat("yyyyMMdd", Locale.ENGLISH)
        val currentDate = sdf.format(Date())

        val folderName = "src/test/tmp/export_folder/"
        val fileName = "export_${currentDate}.csv"
        val folder = File(folderName)
        val file = File(folderName, fileName)

        // Cleaning before test
        file.delete()

        export.allIn(folderName)
        val lines = file.readLines()

        assertTrue("Folder created", folder.exists())
        assertTrue("File created", file.exists())
        assertEquals("Number of lines is correct", lines.size, 3)
        assertEquals("First line is correct", lines[0], "'titre 1','desc 1',1584479884515,8.0,1584479884515,0,'tag 1.1|Tag 2.1'")
    }

    private fun fakeActivitiesWithTags(): MutableList<ActivityWithTags> {
        var awt = mutableListOf<ActivityWithTags>()

        awt.add(ActivityWithTags(Activity("titre 1", "desc 1", 8f), mutableListOf(Tag("tag 1.1"), Tag("Tag 2.1"))))
        awt.add(ActivityWithTags(Activity("titre 2", "desc 2", 4f), mutableListOf(Tag("tag 2.1"), Tag("Tag 2.2"))))
        awt.add(ActivityWithTags(Activity("titre 3", "desc 3", 2f), mutableListOf(Tag("tag 3.1"), Tag("Tag 3.2"))))

        return awt
    }

}