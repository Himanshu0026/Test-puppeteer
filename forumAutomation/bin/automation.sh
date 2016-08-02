#!/bin/sh
AUTOMATION_HOME='/home/monika/websitetoolbox/git/QA-automation/forumAutomation'
cd $AUTOMATION_HOME
casperjs test ../forum/automation.js --feature=login> "$AUTOMATION_HOME"/log/automation.txt
sleep 5
casperjs test ../forum/automation.js --feature=register >> "$AUTOMATION_HOME"/log/automation.txt
sleep 5
casperjs test ../forum/automation.js --feature=profile >> "$AUTOMATION_HOME"/log/automation.txt
sleep 5
casperjs test ../forum/automation.js --feature=topic >> "$AUTOMATION_HOME"/log/automation.txt
sleep 5
cat "$AUTOMATION_HOME"/log/automation.txt | grep FAIL > "$AUTOMATION_HOME"/log/fail.txt 
cat "$AUTOMATION_HOME"/log/automation.txt | grep "tests executed in"
exit 0
