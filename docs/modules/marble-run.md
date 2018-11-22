# Marble run

![marble run demo](../img/marble-run.gif)

@todo: introduction

## Requirements

In order to use this module, the following requirements must be present:

### Raspberry-pi

You need to run either the `server` or `server-slave` on a raspberry pi. Configure this module
for the application running on the raspberry-pi.

### pi-blaster

@todo: refer to pi-blaster docs

### relay board

@todo: show image of an relay board

## Configuration

To enable this module, add the module to the `server/config/config.json`:

```json
{
    "modules": [
        {
            "name": "MarbleRun",
            "config": {
                "gpioPin": 5,
                "oneMarbleFireTime": 300,
                "maxMarbles": 10,
                "runDuration": 13000
            }
        }
    ]
}
```

The `config` object must be configured as following:

| key                 | required? | description                                                              |
| ------------------- | --------- | ------------------------------------------------------------------------ |
| `gpioPin`           | yes       | GPIO pin number on the raspberry-pi that controls the relay board switch |
| `oneMarbleFireTime` | yes       | Time in milliseconds it takes to release 1 marble                        |
| `maxMarbles`        | yes       | Maximum amount of marbles to be fired at the same time                   |
| `runDuration`       | yes       | Duration of the run in milliseconds                                      |

In order to push an action, you need to configure a trigger and an event. For example:

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
                    "name": "MarbleRun",
                    "push": {
                        "fireAmount": 3
                    }
                }
            ]
        }
    ]
}
```

The `push` object must be configured as following:

| key          | required? | description                                       |
| ------------ | --------- | ------------------------------------------------- |
| `fireAmount` | yes       | The amount of marbles to fire into the marble run |

Restart the application to enable the module.
