#!/bin/sh
AUTOMATION_HOME='/etc/automation'

cd /home/automation

./QA-automation/./node_modules/.bin/eslint "$@" >> "$AUTOMATION_HOME"/log/eslintErrors.txt

exit 0
