#!/bin/sh
# Update the server's running files
HOST=192.168.2.10
USER=magnias

echo "Copying backend..."
rsync -av -e ssh --exclude='node_modules' backend/* $USER@$HOST:Excuze-backend
ssh $USER@$HOST 'sh -c "cd Excuze-backend && ./build.sh"'

echo "Restarting pm2.."
ssh $USER@$HOST pm2 restart Excuze
