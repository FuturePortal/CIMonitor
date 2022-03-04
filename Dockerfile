# ==================================
# Base stage
# ==================================

FROM node:16-alpine as base

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
#
# Before a production build, all js
# files should be build and a
# production install of yarn
# ==================================

FROM base as production

ENV NODE_ENV=production

COPY . /CIMonitor

RUN apk add --no-cache dumb-init

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["npm", "run", "start"]
