# Power up

![power up demo](../img/beacon-light.gif)

The power up module can switch a relay switch on for a specific amount of time.
In the image above, a beacon light is turned on for a few seconds. You can
however turn on pretty much anything you like.

## Requirements

In order to use this module, the following requirements must be present:

### Raspberry-pi

You need to run either the `server` or `module-client` on a raspberry pi. Configure this module
for the application running on the raspberry-pi.

### pi-blaster

To control the relay board, CIMonitor requires you to have pi-blaster installed.
Check the [pi-blaster repository](https://github.com/sarfata/pi-blaster) and make sure it is
installed on your Raspberry pi.

### relay board

![](https://www.trafex.nl/wp-content/uploads/2014/08/2014-08-22-13.29.36.jpg)

You need a relay board connected to your raspberry as described in
[Tim de Pater's blog post](https://www.trafex.nl/2014/08/25/connect-a-relay-board-to-your-raspberry-pi/).
CIMonitor will use pi-blaster to control the relays though instead of the `gpio` api.

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
