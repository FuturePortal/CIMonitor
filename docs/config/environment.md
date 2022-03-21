# Environment variables

Below you can find the environment variables that can be set. Check the running specific documentation on how to set
these values on your CIMonitor instance.

| Environment variable | Default value | Description                                                               |
| -------------------- | ------------- | ------------------------------------------------------------------------- |
| PORT                 | 3030          | The port CIMonitor is running on                                          |
| PERSIST_WEBHOOKS     | false         | Enable this to save webhooks to json files for debugging purposes         |
| STORAGE_TYPE         | json          | How to save statuses and server settings? Pick from: `json` or `firebase` |
| FIREBASE_KEY_FILE    | ""            | Required when `STORAGE_TYPE=firebase`. See [firebase](./firebase.md)      |
| FIREBASE_URL         | ""            | Required when `STORAGE_TYPE=firebase`. See [firebase](./firebase.md)      |
