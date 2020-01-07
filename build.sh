#!/bin/bash
git add .
git pull
#IF PULL ERROR
# git fetch
# git reset --hard origin/master
# git pull

#Stop Running Images
docker stop $(docker ps -a -q --filter ancestor=zeetomic-webapp)

#Building Latest Image
docker build -t zeetomic-webapp .

#Runing Engine
docker run -it -d -p 5000:5000 zeetomic-webapp
