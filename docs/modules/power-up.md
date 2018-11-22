# Power up

![power up demo](../img/beacon-light.gif)

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
            "name": "PowerUp",
            "config": {}
        }
    ]
}
```

The `config` object can be empty but must be present.

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
                    "name": "PowerUp",
                    "push": {
                        "gpioPin": 3,
                        "powerForMilliseconds": 3000
                    }
                }
            ]
        }
    ]
}
```

The `push` object must be configured as following:

| key                    | required? | description                                                              |
| ---------------------- | --------- | ------------------------------------------------------------------------ |
| `gpioPin`              | yes       | GPIO pin number on the raspberry-pi that controls the relay board switch |
| `powerForMilliseconds` | yes       | Time in milliseconds that the module should be powered-up for            |

Restart the application to enable the module.
