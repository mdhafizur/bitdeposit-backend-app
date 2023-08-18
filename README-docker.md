## Run a specific service
```
$ docker compose -f compose.yml up -d --build [service-name] --force-recreate
e.g. docker compose -f compose.yml up -d --build nestjs
```
## Force docker to recreate service
```
$ docker compose -f compose.yml up -d --build [service-name] --force-recreate
e.g. docker compose -f compose.yml up -d --build nestjs --force-recreate
```
## Run all services in a single yml file
```
e.g. docker compose -f compose.yml up -d --build
```

Build image for Multi Arch: https://docs.docker.com/desktop/multi-arch/
```
$ docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t username/bitdeposit-backend:latest --push .
```

To check the details of a container
e.g. it is helpful to check if the label for specific app has been set properly or not
```
$ docker inspect --format='' [container-name]
```

Scale an instance of Docker services
```
$ docker compose -f compose.yml up -d --scale [service-name]=3
```
```
build image with image builder
https://medium.com/geekculture/docker-build-with-mac-m1-d668c802ab96

$ docker buildx build -f compose/nestjs/Dockerfile  --tag bitdeposit-nestjs -o type=image --platform linux/amd64,linux/arm64 .

$ docker buildx build -f compose/nestjs/Dockerfile --platform linux/amd64,linux/arm64 --push -t hafizurupm/bitdeposit-nestjs .

$ docker buildx build -f compose/nestjs/Dockerfile --platform linux/amd64,linux/arm64 --push -t softic/bitdeposit-nestjs:latest .

$ docker buildx build -f compose/nestjs/Dockerfile --push -t hafizurupm/bitdeposit-nestjs .

$ docker image build -t bitdeposit-nestjs -f compose/nestjs/Dockerfile . 
```