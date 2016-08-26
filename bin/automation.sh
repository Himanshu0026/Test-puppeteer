#!/bin/sh
AUTOMATION_HOME='/etc/automation'
cd $AUTOMATION_HOME
echo "Tests executing for LOGIN" > "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./forum/automation.js --feature=login >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
echo "Tests executing for IN-CONTEXT LOGIN" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./forum/automation.js --feature=incontextlogin >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
echo "Tests executing for REGISTRATION" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./forum/automation.js --feature=register >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
echo "Tests executing for IN-CONTEXT REGISTRATION" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./forum/automation.js --feature=inContextRegistration >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
echo "Tests executing for BACKEND REGISTRATION" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./forum/automation.js --feature=backEndRegistration >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
echo "Tests executing for FORGOT PASSWORD" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./forum/automation.js --feature=forgotpassword >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
echo "Tests executing for HIDE CATEGORY" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./forum/automation.js --feature=hidecategory >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
echo "Tests executing for TOPIC RELATED FUNCTIONALITIES" >> "$AUTOMATION_HOME"/log/automation.txt
casperjs test ./forum/automation.js --feature=topic >> "$AUTOMATION_HOME"/log/automation.txt
sleep 1
cat "$AUTOMATION_HOME"/log/automation.txt | grep FAIL > "$AUTOMATION_HOME"/log/fail.txt 
cat "$AUTOMATION_HOME"/log/automation.txt | grep -i "tests execut"
exit 0
