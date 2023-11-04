# Running locally with node(js)

To run the project locally with nodejs directly, you first need to build a production application. You don't need anything
other than nodejs with npm to achieve this.

## Download CIMonitor

First, you download (or clone) the CIMonitor codebase. For this example we assume that you've downloaded the project into
`~/CIMonitor` (A CIMonitor folder in your user home directory).

## Installing dependencies

We require you to use node 20 with its corresponding npm package. Only instead of npm for dependency
installation, we use `yarn`. If you don't have yarn installed yet, you can easily do this with `npm install --global yarn`.

After yarn is installed, you need to run `yarn install` to download all the dependencies the project requires. This will
create a `~/CIMonitor/node_modules/` folder.

## Building production application

Now that all dependencies are ready, we need to build the CIMonitor application from the source files. This is required
to get code that can be run by nodejs. To do this, you simply run: `yarn build`. This will output a new `~/CIMonitor/app/` folder
and a `~/CIMonitor/dashboard/` folder. There are the files that we need to run CIMonitor locally.

## Configuration

Copy the file `~/CIMonitor/local.env` to `~/CIMonitor/.env`, and in that new file, change the configuration you desire
according to the [environment variable configuration](../config/environment.md). This `.env` file will be picked up
automatically when running CIMonitor via nodejs.

## Running CIMonitor

Now that we have our `~/CIMonitor/.env` file set up the way we want, and we have a `~/CIMonitor/app/` and `~/CIMonitor/dashboard/` folder,
we've all required files to run.

Last thing we need to do, configure the `NODE_PATH` environment variable to the `app` folder we've generated. This can
be done running the following command: `export NODE_PATH=~/CIMonitor/app/` (adjust the path to your local folder path).
Without this NODE_PATH, the application won't be able to find any imports.

Everything is ready, simply start running CIMonitor running `yarn start`.

# PM2

To run the application locally in the background, we recommend that you use PM2. Read more about PM2 in their
[quick start documentation](https://pm2.keymetrics.io/docs/usage/quick-start/).
