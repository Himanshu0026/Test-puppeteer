#!/bin/sh

# Check if redis is running or not
if pgrep "redis-server" > /dev/null
then
	echo "Redis server is Running."
else
	echo "Redis server is not running. Starting it...."
	/usr/local/bin/redis-server &
	sleep 2
fi

# Start the application through "automation" user
#sudo -H -u automation bash -c '/etc/automation/bin/init.sh'
/etc/automation/bin/init.sh

