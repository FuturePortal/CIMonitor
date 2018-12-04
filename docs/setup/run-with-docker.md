# Run with Docker

CIMonitor is pre-packaged for you in a docker container, making it super easy to run CIMonitor when you have docker installed. You can
find all available tags on the [docker hub](https://hub.docker.com/u/cimonitor/).

## Running the docker container

To run CIMonitor there is one file you need to prepare, being the config file. Make sure you've set up the configuration file
as described on [the configuration page](./configuration.md).

Optionally, you can provide another json file to store CIMonitor's statuses in. This can be an empty json file, that will be filled
by the container once it's running. This way the statuses won't be lost when you restart the container.

Open your terminal in a folder with a `config.json` file and optionally a `saved-statuses.json` file and run the following command:

```bash
docker run \
    -p 9999:9999 \
    -v $PWD/config.json:/opt/CIMonitor/server/config/config.json \
    -v $PWD/saved-statuses.json:/opt/CIMonitor/server/config/saved-statuses.json \
    cimonitor/cimonitor:latest
```

**Note:** with `-p 9999:9999` you define at what port you want to run your docker container, you can change the first number to anything you like (`-p 4567:9999` for example).

Pretty much the same goes when you want to run the server-slave application, you can run:

```bash
docker run \
    -p 9999:9999 \
    -v $PWD/config.json:/opt/CIMonitor/server/config/config.json \
    cimonitor/cimonitor-slave:latest
```

Main difference is that the server slave doesn't need a saved statuses file.

**Note:** If you want to run a different version than `latest`, check the [docker hub](https://hub.docker.com/u/cimonitor/)!

## Run on ARM (Raspberry pi)

We have also prepared a docker container that can run on ARM systems (a Raspberry pi for example). Check if your ARM device
is running at 64 bits or 32 bits, and append the following to your docker-tag accordingly: `-arm64` or `-arm32`. So running
the latest version of CIMonitor on a Raspberry pi 3 will look like the following:

```bash
docker run \
    -p 9999:9999 \
    -v $PWD/config.json:/opt/CIMonitor/server/config/config.json \
    -v $PWD/saved-statuses.json:/opt/CIMonitor/server/config/saved-statuses.json \
    cimonitor/cimonitor:latest-arm64
```

Check all available tags on the [docker hub](https://hub.docker.com/u/cimonitor/).
