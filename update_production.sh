echo "Updating repo"
git pull

cd ./provisioning/starbar/

echo "Rebuilding docker environment"
docker-compose up -d --build
