#!/bin/bash

# determining full path to the script:
pushd `dirname $0` > /dev/null
SCRIPTPATH=`pwd`
popd > /dev/null

chromium-browser --enable-file-access-from-files --kiosk $SCRIPTPATH/kiosk.html
