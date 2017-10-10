#!/bin/bash
AUTOMATION_HOME='/etc/automation/backstopjs'
cd $AUTOMATION_HOME
printf "Executing Backstop \n" 
backstop reference --configPath=backstop-settings.js
sleep 1
backstop test --configPath=backstop-settings.js 
sleep 1
backstop openReport
exit 0

