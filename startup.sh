#!/bin/bash

# determining full path to the script:
cd `dirname $0`
SCRIPTPATH=`pwd`

cd assets/video

ls -A1 *.mp4 > list.txt

cd $SCRIPTPATH

sed -e "s#%KIOSK_HOME%#${SCRIPTPATH}#g" assets/js/config.js.template > assets/js/config.js
chromium-browser --enable-file-access-from-files --kiosk $SCRIPTPATH/kiosk.html
