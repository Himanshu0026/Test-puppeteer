#!/bin/sh
AUTOMATION_HOME='/etc/automation'
cd $AUTOMATION_HOME
printf "Executing Automation Script For $1 commitID\nTests executing for OO_Script: \n" > "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=oo_script --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
cat "$AUTOMATION_HOME"/log/automation.txt | grep -E 'FAIL'> "$AUTOMATION_HOME"/log/fail.txt
cat "$AUTOMATION_HOME"/log/automation.txt | grep -i "tests execut" > "$AUTOMATION_HOME"/log/result.txt
cat "$AUTOMATION_HOME"/log/result.txt
rm "$AUTOMATION_HOME"/log/result.txt
exit 0
