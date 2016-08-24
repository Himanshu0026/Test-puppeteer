#!/bin/sh

FOREVER='/usr/local/bin/forever'
AUTOMATION_LOG='/var/log/scripts/automation.log'
AUTOMATION_HOME='/home/monika/project/git/QA-automation/forumAutomation'
cd $AUTOMATION_HOME
sudo "$FOREVER" start --minUptime 1000 --spinSleepTime 1000 -a -l "$AUTOMATION_LOG" "$AUTOMATION_HOME"/main.js

