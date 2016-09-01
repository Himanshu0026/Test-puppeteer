#!/bin/sh
AUTOMATION_HOME='/etc/automation'
cd $AUTOMATION_HOME
printf "Tests executing for LOGIN: \n" > "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./forum/automation.js --feature=login >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nTests executing for IN-CONTEXT LOGIN: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./forum/automation.js --feature=incontextlogin >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nTests executing for REGISTRATION: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./forum/automation.js --feature=register >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nTests executing for IN-CONTEXT REGISTRATION: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./forum/automation.js --feature=inContextRegistration >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nTests executing for BACKEND REGISTRATION: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./forum/automation.js --feature=backEndRegistration >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nTests executing for FORGOT PASSWORD: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./forum/automation.js --feature=forgotpassword >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nTests executing for HIDE CATEGORY: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./forum/automation.js --feature=hidecategory >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nTests executing for EDIT PROFILE: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./forum/automation.js --feature=editProfile >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nTests executing for EDIT PROFILE WITH SETTINGS: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./forum/automation.js --feature=editProfileWithSettings >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
cat "$AUTOMATION_HOME"/log/automation.txt | grep FAIL > "$AUTOMATION_HOME"/log/fail.txt 
cat "$AUTOMATION_HOME"/log/automation.txt | grep -i "tests execut" > "$AUTOMATION_HOME"/log/result.txt
cat "$AUTOMATION_HOME"/log/result.txt
rm "$AUTOMATION_HOME"/log/result.txt
exit 0
