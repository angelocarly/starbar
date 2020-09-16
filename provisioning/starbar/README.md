# Docker-compose configuration

## Configuration
To run the application, 3 password files have to be created in `./secrets/`. These are:
- backend_secret
- db_pass
- db_user

## Running
First, run a jwilder/proxy docker container

Then, run docker-compose with the following command:
```
docker-compose up -d --build
```

Extra configuration might be needed if another URL wants to be used (TODO).
