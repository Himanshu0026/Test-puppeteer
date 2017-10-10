#!/bin/bash
AUTOMATION_HOME='/etc/automation/backstopjs'
cd $AUTOMATION_HOME
printf "Executing Backstop Script: \n"  
backstop reference --configPath=backstop-settings.js --branchName=$1
sleep 1
backstop test --configPath=backstop-settings.js --branchName=$1
sleep 1
backstop openReport
exit 0
