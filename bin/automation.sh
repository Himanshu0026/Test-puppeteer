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
printf "Executing Automation Script For $1 commitID\nTests executing for REGISTRATION: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=register --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for INCONTEXT REGISTRATION: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=incontextRegistration --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for PRIVATE MESSAGE: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=privateMessage --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for MESSAGE PREVIEW(In Private Message): \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=messagePreview --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for EDIT PROFILE PAGE: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=editProfilePage --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for COMPOSE TOPIC: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=composeTopic --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for PROFILE PAGE: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=profilePage --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for THUMPS UP AND DOWN: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=thumpsUpDown --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for DELETE POST: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=deletePost --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for FOLLOW PIN LOCK: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature="followPinLock" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for FORUM-LISTING PAGE: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=forumListingPage --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for COMBINATION OF SUB CATEGORY AND GROUP PERMISSION for registered user: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature="combinationOfSubCategoryAndGroupPermissions registerUserTest" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for COMBINATION OF CATEGORY AND GROUP PERMISSION for registered user: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature="combinationOfCategoryAndGroupPermissions registerUserTest" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for MOVE TOPIC AND POST: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature="moveTopicAndPost" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for ADD POLL: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=addPoll --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for MODERATOR PERMISSIONS: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature="moderatorPermissions" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for APPROVAL QUEUE for postTest: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature="postEventMemberApproval postTest" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for BackArrow: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature="backArrow" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "Executing Automation Script For $1 commitID\nTests executing for APPROVAL QUEUE for eventTest: \n" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature="postEventMemberApproval eventTest" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for APPROVAL QUEUE for memberApprovalTest: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature="postEventMemberApproval memberApprovalTest" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for APPROVAL QUEUE for memberDeletionTest: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature="postEventMemberApproval memberDeletionTest" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
cat "$AUTOMATION_HOME"/log/automation.txt | grep -E 'FAIL|TypeError:|ResourceError:'> "$AUTOMATION_HOME"/log/fail.txt
cat "$AUTOMATION_HOME"/log/automation.txt | grep -i "tests execut" > "$AUTOMATION_HOME"/log/result.txt
cat "$AUTOMATION_HOME"/log/result.txt
rm "$AUTOMATION_HOME"/log/result.txt
exit 0
