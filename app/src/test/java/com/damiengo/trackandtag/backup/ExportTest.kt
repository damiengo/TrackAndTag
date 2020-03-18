package com.damiengo.trackandtag.backup

import android.util.Log
import com.damiengo.trackandtag.entity.Activity
import com.damiengo.trackandtag.entity.ActivityWithTags
import com.damiengo.trackandtag.entity.Tag
import com.damiengo.trackandtag.repository.ActivityRepository
import org.junit.After
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
    private val tmpDirName = "src/test/tmp/export_folder/"

    @Before
    fun setUp() {
        val mockRepo: ActivityRepository = mock(ActivityRepository::class.java)
        `when`(mockRepo.getActivities()).thenReturn(fakeActivitiesWithTags())

        export.repository = mockRepo

        cleanTmpDir()
    }

    @After
    fun tearDown() {
        cleanTmpDir()
    }

    @Test
    fun export_fullData_Ok() {
        val sdf = SimpleDateFormat("yyyyMMdd", Locale.ENGLISH)
        val currentDate = sdf.format(Date())

        val fileName = "export_${currentDate}.csv"
        val folder = File(tmpDirName)
        val file = File(tmpDirName, fileName)

        export.allIn(tmpDirName)
        val lines = file.readLines()

        assertTrue("Folder created", folder.exists())
        assertTrue("File created", file.exists())
        assertEquals("Number of lines is correct", lines.size, 3)
        assertEquals("First line is correct", lines[0], "'titre 1','desc 1',1535066408,8.0,1535066408,0,'tag 1.1|Tag 2.1'")
    }

    private fun fakeActivitiesWithTags(): MutableList<ActivityWithTags> {
        var awt = mutableListOf<ActivityWithTags>()

        awt.add(ActivityWithTags(Activity("titre 1", "desc 1", 8f, 1535066408, 1535066408), mutableListOf(Tag("tag 1.1"), Tag("Tag 2.1"))))
        awt.add(ActivityWithTags(Activity("titre 2", "desc 2", 4f, 1438141808, 1438141808), mutableListOf(Tag("tag 2.1"), Tag("Tag 2.2"))))
        awt.add(ActivityWithTags(Activity("titre 3", "desc 3", 2f, 1438141808, 1535066408), mutableListOf(Tag("tag 3.1"), Tag("Tag 3.2"))))

        return awt
    }

    private fun cleanTmpDir() {
        val dir = File(tmpDirName)
        if(dir.isDirectory) {
            dir.listFiles().forEach {
                File(it.absolutePath).delete()
            }
        }
    }

}