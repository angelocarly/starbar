#!/bin/sh
HOST=192.168.2.10
USER=magnias

scp -r frontend/build/* root@$HOST:/var/www/html
scp -r backend $USER@$HOST:/home/$USER/Excuze-backend
