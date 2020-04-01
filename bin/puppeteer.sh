#!/bin/sh
PUPPETEER_HOME='/home/automation/QA-automation/puppeteer'
cd $PUPPETEER_HOME
printf "Executing Puppeteer Script For $1 commitID\nTests executing for PROFILE-PAGE task: \n" >> /etc/automation/log/automation.txt
npm test >> /etc/automation/log/automation.txt
sleep 1
cat /etc/automation/log/automation.txt | grep -i "tests execute" > /etc/automation/log/result.txt
exit 0
