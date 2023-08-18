ARG BUILD_ENV=development

FROM traefik:v2.9.6 AS base

RUN mkdir -p /etc/traefik/acme 
RUN touch /etc/traefik/acme/acme.json
RUN chmod 600 /etc/traefik/acme/acme.json

FROM base AS development-build
RUN echo "FROM base AS development-build"

COPY ./compose/traefik/config/development.yml /etc/traefik/traefik.yml

FROM base AS production-build
COPY ./compose/traefik/config/production.yml /etc/traefik/traefik.yml

FROM ${BUILD_ENV}-build AS final
RUN echo ${BUILD_ENV}
RUN echo 'FROM ${BUILD_ENV}-build AS final'