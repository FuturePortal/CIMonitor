# [![image](https://avatars2.githubusercontent.com/u/18479455?s=60&v=4)](https://cimonitor.readthedocs.io) CIMonitor v4

[![release](https://img.shields.io/github/release/FuturePortal/CIMonitor.svg)](https://github.com/FuturePortal/CIMonitor/releases)
[![MIT](https://img.shields.io/github/license/FuturePortal/CIMonitor.svg)](https://github.com/FuturePortal/CIMonitor/)
[![docker pulls](https://img.shields.io/docker/pulls/cimonitor/server.svg)](https://hub.docker.com/u/cimonitor/)
[![stars](https://img.shields.io/github/stars/FuturePortal/CIMonitor.svg)](https://github.com/FuturePortal/CIMonitor/stargazers)
[![read-the-docs](https://readthedocs.org/projects/cimonitor/badge/?version=latest)](https://cimonitor.readthedocs.io)

CIMonitor is a place where all your CI statuses come together. Check if all tests have passed, and if
deployments are successful. All in one overview. This is all done via **webhooks**, so no complex configuration.
[Get started](https://cimonitor.readthedocs.io/en/latest/getting-started)!

## Supported webhooks

- [GitHub](https://cimonitor.readthedocs.io/en/latest/webhook/github/)
- [GitLab](https://cimonitor.readthedocs.io/en/latest/webhook/gitlab/)
- [Read the Docs](https://cimonitor.readthedocs.io/en/latest/webhook/readthedocs/)
- [BitBucket](https://cimonitor.readthedocs.io/en/latest/webhook/bitbucket/)

## Example

![Dashboard demonstration](docs/images/dashboard.gif)

# Getting started

The easiest and quickest way to run CIMonitor is via docker. But there are other options available for you. Check the
options below in the documentation:

- [docker](https://cimonitor.readthedocs.io/en/latest/run/docker/)
- [kubernetes](https://cimonitor.readthedocs.io/en/latest/run/kubernetes/)
- [locally with nodejs](https://cimonitor.readthedocs.io/en/latest/run/locally/)

# Development

To start development, run the following commands on your terminal:

- `./Taskfile`: See all available make commands.
- `./Taskfile init`: Set up the project for local development (required to run locally).
- `./Taskfile start`: Run the development server.

# Contributors

A big thanks to all the contributors who make CIMonitor what it is today!

![contirubtor avatars](https://contrib.rocks/image?repo=futureportal/cimonitor)
