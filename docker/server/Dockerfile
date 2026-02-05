ARG BASE_IMAGE=node:22-alpine

# ==================================
# Base stage
# ==================================

FROM ${BASE_IMAGE} as base

WORKDIR /CIMonitor

# ==================================
# Local development server
# ==================================

FROM base as server

ENV NODE_PATH=/CIMonitor

CMD ["npm", "run", "server"]

# ==================================
# Local development dashboard
# ==================================

FROM base as dashboard

CMD ["npm", "run", "dashboard"]

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

CMD ["npm", "run", "start"]
