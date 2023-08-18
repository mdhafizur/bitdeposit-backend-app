ARG NODE_VERSION=18
ARG BUILD_ENV=production
ARG EXPOSE_TRAEFIK=false

FROM node:${NODE_VERSION} AS node

# Node 'build' stage
FROM node as node-build-stage

ARG APP_HOME=/usr/src/app
ENV NODE_ENV=${BUILD_ENV}

RUN su root && apt update && apt-get -y upgrade && apt install chromium -y
RUN apt-get install sudo -y
WORKDIR ${APP_HOME}
RUN sudo chown -R $(whoami) ${APP_HOME}

RUN npm install -g npm@9.2.0
RUN npm install -g @nestjs/cli
RUN npm i -g prisma

COPY --chown=nestjs:nestjs ./compose/nestjs/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

COPY --chown=nestjs:nestjs ./compose/nestjs/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start


# Node 'run' stage
FROM node-build-stage AS node-run-stage

# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

# install packages
RUN npm ci --force


# Dev Build
FROM node-run-stage as node-run-version-development
ARG DOMAIN_URL=localhost
# copy application code to WORKDIR
COPY . ${APP_HOME}


# Production Build
FROM node-run-stage AS node-run-version-production
RUN echo 'FROM node-run-stage AS node-run-version-production'
ARG DOMAIN_URL=bitdeposit.org

COPY --chown=nestjs:nestjs ./compose/nestjs/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

COPY --chown=nestjs:nestjs ./compose/nestjs/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start



# Expose to traefik
FROM node-run-version-${BUILD_ENV} AS node-run-expose-true
RUN echo ${BUILD_ENV}
RUN echo 'FROM node-run-version-${BUILD_ENV} AS node-run-expose-true'

ARG DOMAIN_URL=bitdeposit.org
ARG TRAEFIK_PROTOCOL
ARG TRAEFIK_SUBDOMAIN
ARG TRAEFIK_PORT

# LABEL traefik.enable=true
# LABEL traefik.docker.network=web
# LABEL traefik.default.protocol=${TRAEFIK_PROTOCOL}
# LABEL traefik.http.routers.${TRAEFIK_SUBDOMAIN}.entrypoints=${TRAEFIK_PROTOCOL}
# LABEL traefik.http.routers.${TRAEFIK_SUBDOMAIN}.rule=Host(`${TRAEFIK_SUBDOMAIN}.${DOMAIN_URL}`)
# LABEL traefik.http.routers.${TRAEFIK_SUBDOMAIN}.tls.certresolver=le
# LABEL traefik.http.routers.${TRAEFIK_SUBDOMAIN}.tls.domains[0].main=${DOMAIN_URL}
# LABEL traefik.http.routers.${TRAEFIK_SUBDOMAIN}.tls.domains[0].sans=*.${DOMAIN_URL}
# LABEL traefik.http.services.${TRAEFIK_SUBDOMAIN}.loadbalancer.server.scheme=${TRAEFIK_PROTOCOL}
# LABEL traefik.http.services.${TRAEFIK_SUBDOMAIN}.loadbalancer.server.port=${TRAEFIK_PORT}



# Not exposed to traefik
FROM node-run-version-${BUILD_ENV} AS node-run-expose-false
RUN echo 'FROM node-run-version-${BUILD_ENV} AS node-run-expose-false'

FROM node-run-expose-${EXPOSE_TRAEFIK} AS final
RUN echo 'FROM node-run-expose-${EXPOSE_TRAEFIK} AS final'

ENTRYPOINT ["/entrypoint"]
