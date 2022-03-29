ARG QEMU_BINARY=notset
ARG BASE_IMAGE=node:16-slim

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
# Production build - QEMU emulator
# ==================================

FROM base as production-qemu

COPY ./${QEMU_BINARY}* /usr/bin/

RUN echo "deb http://deb.debian.org/debian unstable main contrib non-free" >> /etc/apt/sources.list \
    && apt-get update \
    && apt-get install dumb-init

# ==================================
# Production
# ==================================

FROM base as production

ENV NODE_ENV=production
ENV NODE_PATH=/CIMonitor/app

# Copy dumb-init from the QEMU stage
COPY --from=production-qemu /usr/bin/dumb-init /usr/bin/dumb-init

# Make sure "yarn build" is ran before building the production container
COPY . /CIMonitor

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["npm", "run", "start"]
