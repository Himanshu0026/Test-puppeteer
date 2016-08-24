#!/bin/sh
AUTOMATION_HOME='/home/monika/project/git/QA-automation/forumAutomation'
cd $AUTOMATION_HOME
echo "Tests executing for LOGIN" > "$AUTOMATION_HOME"/log/automation.txt
casperjs test ../forum/automation.js --feature=login >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
echo "Tests executing for REGISTRATION" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ../forum/automation.js --feature=register >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
echo "Tests executing for HIDE CATEGORY" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ../forum/automation.js --feature=hidecategory >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
echo "Tests executing for BACKEND REGISTRATION" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ../forum/automation.js --feature=backEndRegistration >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
cat "$AUTOMATION_HOME"/log/automation.txt | grep FAIL > "$AUTOMATION_HOME"/log/fail.txt 
cat "$AUTOMATION_HOME"/log/automation.txt | grep -i "tests execut"
exit 0
