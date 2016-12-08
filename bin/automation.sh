#!/bin/sh
AUTOMATION_HOME='/etc/automation'
cd $AUTOMATION_HOME
printf "Tests executing for LOGIN: \n" > "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=login >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
#printf "\nTests executing for IN-CONTEXT LOGIN: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature=inContextLogin >> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "\nTests executing for REGISTRATION: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature=register >> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "\nTests executing for IN-CONTEXT REGISTRATION: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./forum/automation.js --feature=inContextRegistration >> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "\nTests executing for BACKEND REGISTRATION: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature=backEndRegistration >> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
printf "\nTests executing for FORGOT PASSWORD: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=forgotPassword >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
#printf "\nTests executing for HIDE CATEGORY: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature=hidecategory >> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "\nTests executing for EDIT PROFILE: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature=editProfile >> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "\nTests executing for EDIT PROFILE WITH SETTINGS: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./forum/automation.js --feature=editProfileWithSettings >> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "\nTests executing for EDIT PROFILE WITH FULL NAME: \n" >> "$AUTOMATION_HOME"/log/automation.casperjs test ./forum/automation.js --feature=editProfileWithFullName >> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "\nTests executing for EDIT PROFILE WITH INSTANT MESSAGE: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./forum/automation.js --feature=editProfileWithInstantMsg >> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "\nTests executing for EDIT PROFILE WITH BIRTHDAY: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./forum/automation.js --feature=editProfileWithBirthday >> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "\nTests executing for EDIT PROFILE WITH SIGNATURE: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./forum/automation.js --feature=editProfileWithSignature >> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "\nTests executing for THUMPS UP AND DOWN: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./forum/automation.js --feature=thumpsUpDown >> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "\nTests executing for GENERAL PERMISSION: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./forum/automation.js --feature=generalPermission >> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "\nTests executing for Start New Topic functionality from home page & verify content with all valid and invalid scenarios: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature=generalTopic >> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "\nTests executing for Verify move topic functionlity : \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature=movetopic >> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "\nTests executing for Forum Listing Page: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature=forumListingPage >> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "\nTests executing for Custom Profile Fields: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature=customProfileField >> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "\nTests executing for Forum Listing Page For Sub Category: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature=forumListingPageForSubCategory >> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
cat "$AUTOMATION_HOME"/log/automation.txt | grep FAIL > "$AUTOMATION_HOME"/log/fail.txt 
cat "$AUTOMATION_HOME"/log/automation.txt | grep -i "tests execut" > "$AUTOMATION_HOME"/log/result.txt
cat "$AUTOMATION_HOME"/log/result.txt
rm "$AUTOMATION_HOME"/log/result.txt
exit 0
