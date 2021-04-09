#!/bin/bash
#
# Saving phone database.
#

db_name=track-and-tag.db
save_dir=../save/`date +'%Y%m%d'`

mkdir -p ${save_dir}

adb -d shell "run-as com.trackandtag cat databases/${db_name}"     > ${save_dir}/${db_name}
adb -d shell "run-as com.trackandtag cat databases/${db_name}-shm" > ${save_dir}/${db_name}-shm
adb -d shell "run-as com.trackandtag cat databases/${db_name}-wal" > ${save_dir}/${db_name}-wal

exit 0