FROM node:10-alpine

RUN apk -U add dumb-init --no-cache

COPY . /opt/

WORKDIR /opt

CMD ["dumb-init", "node", "/opt/server/server.js"]
