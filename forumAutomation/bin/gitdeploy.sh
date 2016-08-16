#!/bin/bash
# This script auto-deploy code on the server from Git hub.
# User can execute this script "./gitdeploy.sh BRANCH_NAME" in his  /home/${USER}/ directory (BRANCH_NAME is the name of the branch).

# if branch name not provided then exit
if [ $# -eq 0 ]; then
	echo "No branch name provided."
	exit 1
fi



CLONE_DIR="/home/monika/Website-Toolbox"
cd /home/monika/
echo "clone dir : $CLONE_DIR"
#if clone exists then no need to create it again
if [ -d "$CLONE_DIR" ]; then
	echo "in IF"
	cd $CLONE_DIR
	git pull
	if [ $? -ne 0 ]; then
		echo "git pull not succeeded."
		rm -rf $CLONE_DIR
		git clone https://its4monika:9c34e09abf76b30fc4f9ac6dab11ad9d3a7c5acd@github.com/webtoolbox/Website-Toolbox.git
		cd $CLONE_DIR
	fi
else
	echo "in else condition"
	#read -p "Enter your github username : " GITUSERNAME
	git clone https://its4monika:9c34e09abf76b30fc4f9ac6dab11ad9d3a7c5acd@github.com/webtoolbox/Website-Toolbox.git
	cd $CLONE_DIR
fi
pwd
echo "cloned code"
# if authentication failed then exit
if [ $? -ne 0 ]; then
	exit 1
fi

echo "Branch:$1"

# switch to branch
git checkout $1

# if error occurred during checkout then aborted (sometimes checkout aborted due to design_src/data/img/wtbfeatures_cus.ai file which  changed in clone process.)
if [ $? -ne 0 ]; then
	echo "Please remove the Website-Toolbox/design_src/data/img/wtbfeatures_cus.ai file and try again."
	exit 1
fi
# copy files into appropriate directories
cp -r /home/monika/Website-Toolbox/cgi-bin/ /www/
cp -r /home/monika/Website-Toolbox/data/ /www
cp -r /home/monika/Website-Toolbox/modules/* /www/modules
cp -r /home/monika/Website-Toolbox/templates/ /www/
cp -r /home/monika/Website-Toolbox/command_line/ /www/

chmod -R --silent 777 /www
chmod -R --silent 777 /www/modules/
#restart apache
sudo apache2ctl graceful && sudo /etc/init.d/nginx reload
