#!/bin/sh
AUTOMATION_HOME='/etc/automation'
cd $AUTOMATION_HOME
printf "Executing Automation Script For $1 commitID\nTests executing for LOGIN: \n" > "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=login --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for BACKEND REGISTRATION: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=backEndRegistration --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for FORGOT PASSWORD: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=forgotPassword --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for LOGIN BY PRIVACY OPTION: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=loginByPrivacyOption --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for IN-CONTEXT LOGIN: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=inContextLogin --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for OLD THEME JSERRORS: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=oldThemeJsErrors --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for REGISTRATION: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature=register --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for INCONTEXT REGISTRATION: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature=incontextRegistration --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for PRIVATE MESSAGE: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=privateMessage --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for PROFILE PAGE: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature=profilePage --proxy-type=none --commitId=$1>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for EDIT PROFILE PAGE: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature=editProfilePage --proxy-type=none --commitId=$1>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for DELETE POST: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature=deletePost --proxy-type=none --commitId=$1>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for EDIT POST: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature=editPost --proxy-type=none --commitId=$1>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for THUMPS UP AND DOWN - featureTest: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature="thumpsUpDown featureTest" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for THUMPS UP AND DOWN - featureTest2: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature="thumpsUpDown featureTest2" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for THUMPS UP AND DOWN- featureTest3: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature="thumpsUpDown featureTest3" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for EDIT PROFILE PAGE(Default Options With Blank Data): \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature="defaultOption blankData" --proxy-type=none --commitId=$1>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for EDIT PROFILE PAGE(Default Options With Enable/Disable): \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature="defaultOption enableDisableEditPage" --proxy-type=none --commitId=$1>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for REGISTRATION PAGE(Default Options With Blank Data): \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature="defaultOption blankDataRegistration" --proxy-type=none --commitId=$1>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for REGISTRATION PAGE(Default Options With Enable/Disable): \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature="defaultOption enableDisableRegistration" --proxy-type=none --commitId=$1>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for PROFILE PAGE: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature=profilePage --proxy-type=none --commitId=$1>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for MESSAGE PREVIEW(In Private Message): \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature=messagePreview --proxy-type=none --commitId=$1>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
cat "$AUTOMATION_HOME"/log/automation.txt | grep -E 'FAIL|TypeError:|ResourceError:'> "$AUTOMATION_HOME"/log/fail.txt
cat "$AUTOMATION_HOME"/log/automation.txt | grep -i "tests execut" > "$AUTOMATION_HOME"/log/result.txt
cat "$AUTOMATION_HOME"/log/result.txt
rm "$AUTOMATION_HOME"/log/result.txt
exit 0
