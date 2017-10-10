#!/bin/bash
AUTOMATION_HOME='/etc/automation/backstopjs'
cd $AUTOMATION_HOME
printf "Executing Backstop Script: \n" > "$AUTOMATION_HOME"/log/fail.txt
backstop reference --configPath=backstop-settings.js>> "$AUTOMATION_HOME"/log/fail.txt 
sleep 1
backstop test --configPath=backstop-settings.js>> "$AUTOMATION_HOME"/log/fail.txt 
sleep 1
backstop openReport>> "$AUTOMATION_HOME"/log/fail.txt
cat "$AUTOMATION_HOME"/log/fail.txt
exit 0
