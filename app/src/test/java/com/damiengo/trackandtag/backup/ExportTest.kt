package com.damiengo.trackandtag.backup

import com.damiengo.trackandtag.repository.ActivityRepository
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.mockito.Mockito.*
import java.io.File

class ExportTest {

    private val export  = Export()

    @Before
    fun setUp() {
        val repository = ActivityRepository()

        val mock: ActivityRepository = mock(ActivityRepository::class.java)
        `when`(mock.getActivities()).thenReturn(mutableListOf())

        export.repository = repository
    }

    @Test
    fun export_fullData_Ok() {
        val folderName = "src/test/tmp/export_folder/"
        val fileName = "test.csv"
        val folder = File(folderName)
        val file = File(folderName, fileName)

        export.allIn(folderName)
        assertTrue("Folder created", folder.exists())
    }

}