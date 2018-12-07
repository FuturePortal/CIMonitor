# Marble run

![marble run demo](../img/marble-run.gif)

The marble run in the in the image above is what got the entire CIMonitor started.
It might be a way too specific module, but it has a great story.

At [Enrise HQ](https://enrise.com) we bought a 3D-printer. Of course we were printing
lots of random crap. Until I (Rick van der Staaij) found an interesting project: the
marble run! I spent more than 2 months printing the entire thing, making 1 to 5 parts a
day during office hours. Once the entire thing was working, I thought it would be nice
to be able to control it remotely! I bought a relay board which I could control with a
Raspberry pi, and created a quick and dirty nodejs application to fire some marbles
into the marble run remotely. With this the idea of CIMonitor was born. How nice would
it be to automatically run some marbles when a deployment succeeds?! From one thing came
the next, and here we are. CIMonitor. Hope you have as much fun as I have!

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

To enable this module, add the module to the `config/config.json`:

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
