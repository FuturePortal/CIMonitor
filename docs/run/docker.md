# Running with Docker

Running CIMonitor with docker is the easiest way to get started quickly. There are some tips and trick you can use
with Docker which we will explain below.

## Starting the container

Running the command below will start CIMonitor on [localhost:3030](http://localhost:3030).

```shell
docker run \
    --publish 3030:3030 \
    --detach \
    --restart unless-stopped \
    --name CIMonitor \
    --volume $(pwd)/storage:/CIMonitor/storage \
    cimonitor/server:latest
```

If you want to override some of the [environment variables](../config/environment.md), you need to add `--env` to your
command. So if you want to change the running port for example, you add `--env PORT 80 --publish 80:80` to the command.

Note, a storage folder will be created from the location you execute the run command. The storage folder is used to
persist server settings and saved statuses.

## Stopping the container

Since we've named the container, stopping the CIMonitor container is as easy as running `docker stop CIMonitor`.

If you haven't named your container, run `docker ps` and find the container id for the image `cimonitor/server`. Then you
can run `docker stop <container_id>`.

## Updating the container

Updating CIMonitor when running docker requires you to pull the latest container with docker, then restarting your
running CIMonitor to use the latest version. When you've named your container you can do this very easily with:

```shell
docker pull cimonitor/server:latest && docker restart CIMonitor
```

If you're running a specific version instead of latest, stop your CIMonitor instance, and run the run command again
(as described on the top of this page) with the new `cimonitor/server:<version>` reference.
