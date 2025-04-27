# Developer Notes: Docker

## Running Services

### Run a Specific Service
To run a specific service, use the following command:
```bash
$ docker compose -f compose.yml up -d --build [service-name] --force-recreate
```
Example:
```bash
$ docker compose -f compose.yml up -d --build nestjs
```

### Force Docker to Recreate a Service
To force Docker to recreate a service, use:
```bash
$ docker compose -f compose.yml up -d --build [service-name] --force-recreate
```
Example:
```bash
$ docker compose -f compose.yml up -d --build nestjs --force-recreate
```

### Run All Services in a Single YML File
To run all services defined in a single `compose.yml` file:
```bash
$ docker compose -f compose.yml up -d --build
```

## Building Docker Images

### Build Image for Multi-Architecture
To build a Docker image for multiple architectures, refer to the [Docker Multi-Arch Documentation](https://docs.docker.com/desktop/multi-arch/):
```bash
$ docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t username/bitdeposit-backend:latest --push .
```

### Build Image with Image Builder
Refer to [this guide](https://medium.com/geekculture/docker-build-with-mac-m1-d668c802ab96) for building images with an image builder. Examples:
```bash
$ docker buildx build -f compose/nestjs/Dockerfile --tag bitdeposit-nestjs -o type=image --platform linux/amd64,linux/arm64 .

$ docker buildx build -f compose/nestjs/Dockerfile --platform linux/amd64,linux/arm64 --push -t hafizurupm/bitdeposit-nestjs .

$ docker buildx build -f compose/nestjs/Dockerfile --platform linux/amd64,linux/arm64 --push -t softic/bitdeposit-nestjs:latest .

$ docker buildx build -f compose/nestjs/Dockerfile --push -t hafizurupm/bitdeposit-nestjs .

$ docker image build -t bitdeposit-nestjs -f compose/nestjs/Dockerfile .
```

## Inspecting Containers
To check the details of a container (e.g., to verify if a label for a specific app has been set properly):
```bash
$ docker inspect --format='' [container-name]
```

## Scaling Docker Services
To scale an instance of Docker services:
```bash
$ docker compose -f compose.yml up -d --scale [service-name]=[number-of-instances]
```
Example:
```bash
$ docker compose -f compose.yml up -d --scale nestjs=3
```