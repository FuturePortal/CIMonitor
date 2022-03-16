# CIMonitor version 3

> :warning: Please note that version 4 has been released. If you wish to continue using version 3, we suggest you
> update to version 3.7.2. This version disables the update checks and lets you use version 3 in peace.

[![dashboard example](docs/img/dashboard.gif)](https://cimonitor.readthedocs.io)

## Features

-   Server application to process and handle all your statuses
-   An easy **API** to push **custom statuses**
-   **Real-time dashboard** of your statuses (deployments, pipelines, builds, ect!)
-   **GitLab web-hook endpoint** to push all **pipeline and build statuses** with ease!
-   **Travis CI web-hook endpoint** to push all **builds** with ease!
-   Support for a **master-slave** setup to have multiple computers listening to statuses
-   Modules that push hardware to represent your status and/or events:

| Philips hue light           | Marble run                   | Power up (beacon light)        |
| --------------------------- | ---------------------------- | ------------------------------ |
| ![](docs/img/hue-light.gif) | ![](docs/img/marble-run.gif) | ![](docs/img/beacon-light.gif) |

All modules are listed in [the documentation](https://cimonitor.readthedocs.io).

## Installation & documentation

All documentation on installation and setting up can be found in the online documentation at
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
-   `make dev-module-client`: Run the development module client that listens to a development server
-   `make dev-dashboard`: Run the dashboard application (restarts automatically when the front-end code changes)

Note: The server needs to run in order to display the dashboard.

### Using Firebase as a backend

To start development when using Firebase as a backend:

-   Set up a Firebase database (see the online documentation)
-   Store the generated JSON file in `config/serviceAccountKey.json`
-   Copy .env.example to .env and update with the right values
-   Start the server as normal, it will now use Firebase as storage backend

## Running production

To start the production build:

-   `make build-production`: Creates all the files required for your production build

We recommend that you run the application with `pm2` so the application will restart if your computer reboots.
More on that in [the documentation](https://cimonitor.readthedocs.io).
