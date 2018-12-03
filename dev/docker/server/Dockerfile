FROM node:10-alpine

RUN apk -U add dumb-init --no-cache

COPY . /CIMonitor/

WORKDIR /CIMonitor

CMD ["dumb-init", "node", "/CIMonitor/server/server.js"]
