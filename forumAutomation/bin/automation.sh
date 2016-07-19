#!/bin/sh
AUTOMATION_HOME='/home/monika/project/git/QA-automation/forumAutomation'
cd $AUTOMATION_HOME
casperjs test ../forum/automation.js > "$AUTOMATION_HOME"/log/automation.log
cat "$AUTOMATION_HOME"/log/automation.log | grep FAIL > "$AUTOMATION_HOME"/log/fail.log 
cat "$AUTOMATION_HOME"/log/automation.log | grep "tests executed in"
exit 0
