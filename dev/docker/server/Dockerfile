FROM node:8-slim

RUN echo "deb http://deb.debian.org/debian unstable main contrib non-free" >> /etc/apt/sources.list \
    && apt-get update \
    && apt-get install dumb-init \
    && rm -rf /var/cache/* /var/lib/apt/lists/* /var/log/* /opt/yarn*

COPY . /opt/CIMonitor/

WORKDIR /opt/CIMonitor/

CMD ["dumb-init", "node", "/opt/CIMonitor/server/server.js"]
