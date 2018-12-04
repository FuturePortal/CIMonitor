FROM node:10-alpine

RUN apk -U add dumb-init --no-cache

COPY . /opt/CIMonitor/

WORKDIR /opt/CIMonitor

CMD ["dumb-init", "node", "/opt/CIMonitor/server/server-slave.js"]
