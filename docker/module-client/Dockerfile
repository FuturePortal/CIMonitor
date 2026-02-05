ARG BASE_IMAGE=node:22-alpine

# ==================================
# Base stage
# ==================================

FROM ${BASE_IMAGE} as base

WORKDIR /CIMonitor

# ==================================
# Local development module-client
# ==================================

FROM base as module-client

ENV NODE_PATH=/CIMonitor

CMD ["npm", "run", "module-client"]

# ==================================
# Production
# ==================================

FROM base as production

ENV NODE_ENV=production
ENV NODE_PATH=/CIMonitor/app

RUN apk add --no-cache dumb-init

# Make sure "yarn build" is ran before building the production container
COPY . /CIMonitor

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["npm", "run", "start-client"]
