# Dashboard video

![Video on the dashboard demo](../img/dashboard-video.gif)

The dashboard video module can play YouTube videos on the connected dashboards
when a specific event is triggered. After the configured amount of time the video
will be hidden.

## Requirements

You can only configure this module for the `server.js`. The `module-client.js` can't
push the video to the dashboard, as it doesn't have a socket server.

## Configuration

To enable this module, add the module to the `server/config/config.json`:

```json
{
    "modules": [
        {
            "name": "DashboardVideo",
            "config": {}
        }
    ]
}
```

The `config` object can be empty but must be present.

In order to push a video to the dashboard, you need to configure a trigger and an event. For example:

```json
{
    "triggers": [
        {
            "on": {
                "state": "success"
            },
            "targetEventName": "celebrate-success"
        }
    ],
    "events": [
        {
            "name": "celebrate-success",
            "modules": [
                {
                    "name": "DashboardVideo",
                    "push": {
                        "youtubeKey": "ZTOIEz7p2KU",
                        "startAt": 20,
                        "duration": 20
                    }
                }
            ]
        }
    ]
}
```

In the `push` object, the following configuration can be set:

| key          | required? | description                                                    |
| ------------ | --------- | -------------------------------------------------------------- |
| `youtubeKey` | yes       | The YouTube video key, for the video you want to play          |
| `startAt`    | yes       | Time in seconds where you want to start the video (may be `0`) |
| `duration`   | yes       | For how many seconds should the video play?                    |

Restart the application to enable the module.
