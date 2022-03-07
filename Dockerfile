# ==================================
# Base stage
# ==================================

FROM node:16-alpine as base

ENV NODE_PATH=/CIMonitor/app/

WORKDIR /CIMonitor

# ==================================
# Local development server
# ==================================

FROM base as server

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

# Make sure "yarn build" is ran before building the production container
COPY . /CIMonitor

RUN apk add --no-cache dumb-init

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["npm", "run", "start"]
