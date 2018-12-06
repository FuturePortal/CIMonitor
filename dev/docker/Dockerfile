ARG COMMAND_FILE
ARG QEMU_BINARY=notset

#--- Intermediate build

FROM node:8-slim as intermediate

COPY ./${QEMU_BINARY}* /usr/bin/

RUN echo "deb http://deb.debian.org/debian unstable main contrib non-free" >> /etc/apt/sources.list \
    && apt-get update \
    && apt-get install dumb-init

#--- Final build

FROM node:8-slim

COPY --from=intermediate /usr/bin/dumb-init /usr/bin/dumb-init
COPY . /opt/CIMonitor/

WORKDIR /opt/CIMonitor/

CMD ["dumb-init", "node", "/opt/CIMonitor/server/${COMMAND_FILE}"]
