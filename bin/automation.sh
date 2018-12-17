#!/bin/sh
AUTOMATION_HOME='/etc/automation'
cd $AUTOMATION_HOME
printf "\nExecuting Automation Script For $1 commitID Task -> LOGIN: " > "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=login --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> BACKEND REGISTRATION: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=backEndRegistration --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> FORGOT PASSWORD: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=forgotPassword --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> LOGIN BY PRIVACY OPTION: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=loginByPrivacyOption --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> IN-CONTEXT LOGIN: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=inContextLogin --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> OLD THEME JSERRORS: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=oldThemeJsErrors --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> REGISTRATION: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=register --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> INCONTEXT REGISTRATION: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=incontextRegistration --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> PRIVATE MESSAGE: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=privateMessage --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> MESSAGE PREVIEW(In Private Message): " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=messagePreview --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> EDIT PROFILE PAGE: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=editProfilePage --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> COMPOSE TOPIC: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=composeTopic --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> PROFILE PAGE: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=profilePage --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID  Task -> THUMPS UP AND DOWN: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=thumpsUpDown --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> DELETE POST: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=deletePost --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> FOLLOW PIN LOCK: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature="followPinLock" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> FORUM-LISTING PAGE: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=forumListingPage --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for COMBINATION OF SUB CATEGORY AND GROUP PERMISSION for registered user: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature="combinationOfSubCategoryAndGroupPermissions registerUserTest" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for COMBINATION OF CATEGORY AND GROUP PERMISSION for registered user: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature="combinationOfCategoryAndGroupPermissions registerUserTest" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> MOVE TOPIC AND POST: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature="moveTopicAndPost" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> ADD POLL: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature=addPoll --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for MODERATOR PERMISSIONS: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature="moderatorPermissions" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> POST APPROVAL: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature="postEventMemberApproval postTest" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> BackArrow: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature="backArrow" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> EVENT APPROVAL: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature="postEventMemberApproval eventTest" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> replyPost: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature="replyPost" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> TOPICS AND POST COUNT: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature="topicsPostCount" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
printf "\nExecuting Automation Script For $1 commitID Task -> LATEST TOPIC PAGE: " >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./automationScripts/automation.js --feature="latestTopic" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for POST TOPIC USER PERMISSINS for registered user: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature="postTopicUserPermission registeredUserTest"  --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
#printf "Executing Automation Script For $1 commitID\nTests executing for APPROVAL QUEUE for memberDeletionTest: \n" >> "$AUTOMATION_HOME"/log/automation.txt
#casperjs test ./automationScripts/automation.js --feature="postEventMemberApproval memberDeletionTest" --branchName=$1 --commitId=$2>> "$AUTOMATION_HOME"/log/automation.txt
#sleep 1
cat "$AUTOMATION_HOME"/log/automation.txt | grep -E 'FAIL|TypeError:|ResourceError:'> "$AUTOMATION_HOME"/log/fail.txt
cat "$AUTOMATION_HOME"/log/automation.txt | grep -i "tests execut" > "$AUTOMATION_HOME"/log/result.txt
cat "$AUTOMATION_HOME"/log/result.txt
cat /var/log/apache2/error.log | grep -v 'duplicate query found\|Duplicate query found\|SELECT\|WHERE\|FROM\|DBALIAS\|DB Profiler\|Page load\|Warn\|LEFT JOIN\|Geoip error\|^$' > "$AUTOMATION_HOME"/log/apacheLog.txt
cp /dev/null /var/log/apache2/error.log
rm "$AUTOMATION_HOME"/log/result.txt
exit 0
