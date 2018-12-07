ARG QEMU_BINARY=notset
ARG BASE_IMAGE=node:8-slim

#--- Intermediate build

FROM ${BASE_IMAGE}

COPY ./${QEMU_BINARY}* /usr/bin/

RUN echo "deb http://deb.debian.org/debian unstable main contrib non-free" >> /etc/apt/sources.list \
    && apt-get update \
    && apt-get install dumb-init

#--- Final build

FROM ${BASE_IMAGE}

COPY --from=0 /usr/bin/dumb-init /usr/bin/dumb-init
COPY . /opt/CIMonitor/

WORKDIR /opt/CIMonitor/

CMD ["dumb-init", "node", "/opt/CIMonitor/back-end/server.js"]
