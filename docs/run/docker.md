# Running with Docker

Running the command below will start CIMonitor on [localhost:3030](http://localhost:3030).

```shell
docker run \
    --publish 3030:3030 \
    --detach \
    --restart unless-stopped \
    cimonitor/server:4.0.0
```
