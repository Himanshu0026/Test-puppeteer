#!/bin/sh

FOREVER='/usr/local/bin/forever'
AUTOMATION_LOG='/var/log/scripts/automation.log'
AUTOMATION_HOME='/etc/automation/'
cp $AUTOMATION_HOME/bin/gitdeploy.sh /home/automation/
cd $AUTOMATION_HOME
"$FOREVER" start --minUptime 1000 --spinSleepTime 1000 -a -l "$AUTOMATION_LOG" "$AUTOMATION_HOME"/forumAutomation/main.js



