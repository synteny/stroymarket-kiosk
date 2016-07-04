#!/bin/bash

# determining full path to the script:
cd `dirname $0`
SCRIPTPATH=`pwd`

#determining chromium executable name:
if hash chromium-browser 2>/dev/null; then
        CHROMIUM="chromium-browser"
    else
        if hash chromium 2>/dev/null; then
	        CHROMIUM="chromium"
	    else
	        if hash chrome 2>/dev/null; then
		        CHROMIUM="chrome"
		    else
		        echo "chromium browser not detected, aborting"
		        exit 1
		    fi
	    fi
    fi

cd assets/video

ls -A1 *.mp4 > list.txt

cd $SCRIPTPATH

sed -e "s#%KIOSK_HOME%#${SCRIPTPATH}#g" assets/js/config.js.template > assets/js/config.js
$CHROMIUM --allow-file-access-from-files --kiosk $SCRIPTPATH/kiosk.html