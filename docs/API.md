# API

- [Statuses](#statuses)
- [Events](#events)

## Statuses

### POST /status

@todo: Explain that you can manually push statuses to the `POST /status`. The API will let you know what's required or not.

```json
{
    "key": "ci-monitor-status-2",
    "title": "CIMonitor",
    "subTitle": "master",
    "state": "success",
    "image": "https://avatars2.githubusercontent.com/u/18479455?s=200&v=4",
    "userImage": "https://avatars3.githubusercontent.com/u/6495166?s=460&v=4"
}
```

| key         | required? | description                                                              |
| ----------- | --------- | ------------------------------------------------------------------------ |
| `key`       | yes       | A unique key for a status (if not unique the status will be overwritten) |
| `title`     | yes       | The title of the status. For example the project name                    |
| `subTitle`  | no        | A sub-title for the status. For example the branch                       |
| `state`     | yes       | Must be: `info`, `warning`, `error`, or `success`                        |
| `image`     | no        | An URL to an image representing the status                               |
| `userImage` | no        | An URL to an image showing the user who triggered the status             |

### DELETE /status/:status-key

@todo: Explain that you can remove statues using `DELETE /status/:status-key`

### GET /status/clear-all

@todo: Explain that yo can remove all statuses using `GET /status/clear-all`

## Events

### POST /event

You can directly trigger an event (configured in the configuration) via `POST /event`.

```json
{
    "event": "celebrate-success"
}
```

| key         | required? | description                                                                |
| ----------- | --------- | -------------------------------------------------------------------------- |
| `event`     | yes       | The configuration key that is used for the event that should be triggered. |
