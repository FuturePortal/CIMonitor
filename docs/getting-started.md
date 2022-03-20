# Getting started with CIMonitor

Running CIMonitor can be done multiple ways. The easiest to get started is running CIMonitor with docker. On this page
you find more information on the environment variables that you can set for your CIMonitor instance, that affect the
way your CIMonitor is behaving.

## Environment variables

Below you can find the environment variables that can be set. Check the running specific documentation on how to set
these values on your CIMonitor instance.

| Environment variable | Default value | Description                                                                                    |
| -------------------- | ------------- | ---------------------------------------------------------------------------------------------- |
| PORT                 | 3030          | The port CIMonitor is running on                                                               |
| PERSIST_WEBHOOKS     | false         | Enable this to save webhooks to json files for debugging purposes                              |
| STORAGE_TYPE         | json          | How to save statuses and server settings? Pick from: `json` or `firebase`                      |
| FIREBASE_KEY_FILE    | ""            | Required when `STORAGE_TYPE=firebase`. This must point to the firebase key file on your system |
| FIREBASE_URL         | ""            | Required when `STORAGE_TYPE=firebase`. This is the URL of your firebase instance               |

## Running CIMonitor

To start running CIMonitor, pick one of the following options and continue there:

-   [Run as docker container](./run/docker.md)
-   [Run in Kubernetes](./run/kubernetes.md)
-   [Run locally with node(js)](./run/locally.md)
