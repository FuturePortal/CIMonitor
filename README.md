# [![image](https://avatars2.githubusercontent.com/u/18479455?s=60&v=4)](https://cimonitor.readthedocs.io) CIMonitor

![code-style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
[![read-the-docs](https://readthedocs.org/projects/cimonitor/badge/?version=latest)](https://cimonitor.readthedocs.io)
[![travis-ci](https://travis-ci.org/CIMonitor/CIMonitor.svg?branch=master)](https://travis-ci.org/CIMonitor/CIMonitor)

The GitLab-CIMonitor is a place where all your CI statuses come together. Check if all tests have passed, and if
deployments are successful. All in one overview.

The time that deployments were scary is over, lets make them FUN!

![](https://user-images.githubusercontent.com/6495166/48635784-6d860c80-e9c9-11e8-9065-3788b1216670.gif)

## Features

-   A **real-time dashboard** of your events and pipelines
-   Add a **GitLab web-hook endpoint** to push all **pipeline and build statuses** with ease!

## Installation & documentation

All documentation on installation and setting up can be found in our online documentation at
[cimonitor.readthedocs.io](https://cimonitor.readthedocs.io).

## Requirements

In order to run the application you need:

-   `make`
-   `yarn`
-   `node`: version 8 or higher

## Local development

To start development run:

-   `make init`: The first time you want to run the project locally
-   `make dev-server`: Run the development server
-   `make dev-client`: Run the dashboard application (restarts automatically when the front-end code changes)

Note: The server needs to run in order to display the dashboard.

## Running production

To start the production build:

-   `make build-production`: Creates all the files required for your production build

We recommend that you run the application with `pm2` so the application will restart if your computer reboots.
