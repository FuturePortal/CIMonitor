# Status API

@todo: Explain that you can manually push statuses to the `POST /status`. The API will let you know what's required or not.

```json
{
    "key": "ci-monitor-status-2",
    "title": "CIMonitor",
    "subTitle": "master",
    "state": "success",
    "image": "https://avatars2.githubusercontent.com/u/18479455?s=200&v=4",
    "userImage": "https://avatars3.githubusercontent.com/u/6495166?s=460&v=4",
    "style": {
      "background": "lime",
      "color": "#fff"
    },
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
| `style`     | no        | A object of custom CSS styles to apply to the status container           |

@todo: Explain that you can remove statues using `DELETE /status/:status-key`

@todo: Explain that yo can remove all statuses using `GET /status/clear-all`
