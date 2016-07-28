#!/bin/sh
AUTOMATION_HOME='/home/monika/project/git/QA-automation/forumAutomation'
cd $AUTOMATION_HOME
casperjs test ../forum/automation.js > "$AUTOMATION_HOME"/log/automation.txt
cat "$AUTOMATION_HOME"/log/automation.txt | grep FAIL > "$AUTOMATION_HOME"/log/fail.txt 
cat "$AUTOMATION_HOME"/log/automation.txt | grep "tests executed in"
exit 0
