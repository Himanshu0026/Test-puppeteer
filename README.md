QA-automation
====
The QA-automation application is used to test the "Forum" application. The automation server continuously listens for the push requests to the repository https://github.com/webtoolbox/Website-Toolbox. Whenever a push event occurs, the automation scripts are executed for the Forum application. If any test case fails, then the Forum developer is notified through email.  

Technologies Used
==
The QA-automation Application is based on casper.js. Following tools and technologies have been used for the application:
 
  Node.js v 6.2.2,  
  Casper.js v 1.1.2,  
  Phantom.js v 2.1.1,  
  Redis v 3.2.1,  
  JetBrains WebStorm IDE,  
  Various Javascript Frameworks and Libraries like github-webhook-handler, moment.js, etc.
  
 Project's Home Directory : /etc/automation

Startup Procedure
=

  Run the command “/etc/automation/bin/startup.sh” 
(Logs are being written under in file "/var/log/scripts/automation.log".)

Stop Procedure
=

  Run the command "/etc/automation/bin/stop.sh"

