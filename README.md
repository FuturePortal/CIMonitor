# [![image](https://avatars2.githubusercontent.com/u/18479455?s=60&v=4)](https://cimonitor.readthedocs.io) CIMonitor v4

[![release](https://img.shields.io/github/release/CIMonitor/CIMonitor.svg)](https://github.com/CIMonitor/CIMonitor/releases)
[![MIT](https://img.shields.io/github/license/CIMonitor/CIMonitor.svg)](https://github.com/CIMonitor/CIMonitor/)
[![docker pulls](https://img.shields.io/docker/pulls/cimonitor/server.svg)](https://hub.docker.com/u/cimonitor/)
[![stars](https://img.shields.io/github/stars/CIMonitor/CIMonitor.svg)](https://github.com/CIMonitor/CIMonitor/stargazers)
[![read-the-docs](https://readthedocs.org/projects/cimonitor/badge/?version=latest)](https://cimonitor.readthedocs.io)
[![travis-ci](https://travis-ci.org/CIMonitor/CIMonitor.svg?branch=master)](https://travis-ci.org/CIMonitor/CIMonitor)

CIMonitor is a place where all your CI statuses come together. Check if all tests have passed, and if
deployments are successful. All in one overview. This is all done via **webhooks**, so no complex configuration.

## Supported webhooks

-   [GitHub](https://cimonitor.readthedocs.io/en/latest/webhook/github/)
-   [GitLab](https://cimonitor.readthedocs.io/en/latest/webhook/gitlab/)
-   [Read the Docs](https://cimonitor.readthedocs.io/en/latest/webhook/readthedocs/)

## Example

![Dashboard demonstration](docs/images/dashboard.png)

# :warning: version 3 :warning:

Are you running version 3, and are not ready to switch to version 4 yet? You can upgrade to version 3.7.2 to suppress
the update notification on the dashboard.

# Getting started

The easiest and quickest way to run CIMonitor is via docker. Running the command below will
start CIMonitor on [localhost:3030](http://localhost:3030), or you can check one of the

```shell
docker run \
    --publish 3030:3030 \
    --detach \
    --restart unless-stopped \
    cimonitor/server:4.0.0
```

## Ways to run CIMonitor

-   [docker](https://cimonitor.readthedocs.io/en/latest/run/docker/)
-   [kubernetes](https://cimonitor.readthedocs.io/en/latest/run/kubernetes/)
-   [locally wit nodejs](https://cimonitor.readthedocs.io/en/latest/run/locally/)

# Development

To start development, run the following commands on your terminal:

-   `make`: See all available make commands.
-   `make init`: Set up the project for local development (required to run locally).
-   `make start`: Run the development server.
