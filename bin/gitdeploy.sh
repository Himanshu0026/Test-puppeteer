#!/bin/bash
# This script auto-deploy code on the server from Git hub.
# User can execute this script "./gitdeploy.sh BRANCH_NAME" in his  /home/${USER}/ directory (BRANCH_NAME is the name of the branch).

#Checking for number of arguments
if [ $# -eq 0 ]; then
	echo "No branch name provided."
	exit 1
fi


if [ $# -eq 1 ]; then
	#if number of arguments is 1, then it will be branch name
	branch=$1
else
	#if more than 1 arguments provided, then find protocol value
	while getopts "p:" flag
	do
		case "$flag" in
			"p") protocol=$OPTARG 
		   	;;
		esac
		echo $OPTARG 
	done
	#3rd argument should be branch name
	branch=$3
fi

# if branch name not provided then exit
if [ -z "$branch" ]; then
	echo "No branch name provided."
	exit 1
fi

# if protocol name not provided, then assign default to "http"
if [ -z "$protocol" ]; then
	protocol="https"
fi

echo "branch name : $branch"
echo "protocol : $protocol"


CLONE_DIR="/home/${USER}/Website-Toolbox"
HOME_DIR="/home/${USER}/"
cd $HOME_DIR
echo "clone dir : $CLONE_DIR"
#if clone exists then no need to create it again
if [ -d "$CLONE_DIR" ]; then
	echo "in IF"
	cd $CLONE_DIR
	git pull
	if [ $? -ne 0 ]; then
		echo "git pull not succeeded."
		cd $HOME_DIR
		rm -rf $CLONE_DIR
		#Checking for given protocol
		if [ "$protocol" == "ssh" ]; then
			git clone ssh://git@github.com/webtoolbox/Website-Toolbox.git
		else
			read -p "Enter your github username : " GITUSERNAME
			git clone https://${GITUSERNAME}@github.com/webtoolbox/Website-Toolbox.git
		fi
		cd $CLONE_DIR
	fi
else
	#Checking for given protocol
	if [ "$protocol" == "ssh" ]; then
		git clone ssh://git@github.com/webtoolbox/Website-Toolbox.git
	else
		read -p "Enter your github username : " GITUSERNAME
		git clone https://${GITUSERNAME}@github.com/webtoolbox/Website-Toolbox.git
	fi
	cd $CLONE_DIR
fi

echo "cloned code"
# if authentication failed then exit
if [ $? -ne 0 ]; then
	exit 1
fi

# switch to branch
git checkout $branch

# if error occurred during checkout then aborted (sometimes checkout aborted due to design_src/data/img/wtbfeatures_cus.ai file which  changed in clone process.)
if [ $? -ne 0 ]; then
	echo "Please remove the Website-Toolbox/design_src/data/img/wtbfeatures_cus.ai file and try again."
	exit 1
fi
# copy files into appropriate directories
cp -r $CLONE_DIR/cgi-bin/ /www/
cp -r $CLONE_DIR/data/ /www
cp -r $CLONE_DIR/modules/* /www/modules
cp -r $CLONE_DIR/templates/ /www/
cp -r $CLONE_DIR/command_line/ /www/

chmod -R --silent 777 /www
chmod -R --silent 777 /www/modules/
#restart apache
sudo apache2ctl graceful && sudo /etc/init.d/nginx reload
