# Modules

Currently modules are pre-installed in the repository, later this will be npm modules so can be added with ease.

To add a status module to your application, you need to provide the
configuration for that module in the global config file
(`app/Config/config.json`) in the statusModules object:

```json
{
    "_comment": "global config...",

    "statusModules": {
        "_comment": "place your module configs in here"
    }
}
```

Available modules:

* [MarbleRun](#marblerun)
* [LedStrip](#ledstrip)
* [TrafficLight](#trafficlight)
* [PowerUp](#powerup)
* [HueLight](#huelight)

## MarbleRun

Run a (or multiple) marble(s) for every event you configured. Requires one GPIO port which is connected to a relay.
The relay will turn on for a limited time, releasing a marble into the track.

```json
        "MarbleRun": {
            "globalConfig": {
                "oneMarbleFireTime": 390,
                "runDuration": 13000,
                "maxMarbles": 10,
                "gpioPin": 7
            },
            "events": [
                {
                    "on": {
                        "status": "success",
                        "type": "deploy"
                    },
                    "do": {
                        "fireAmount": 3
                    }
                },
                "_comment": "You can add as may events as you want"
            ]
        }
```

[Back to the top](#modules)

## LedStrip

Display the status of your board with a led-strip. Red for a failure, orange for an active process, and green for
success!

To have an awesome led-strip added to your CIMonitor, you need to do some hardware hacking first. There is a step
by step tutorial [here](http://popoklopsi.github.io/RaspberryPi-LedStrip/#!/). When you've done that, all you need
to do is configure the correct gpio pins used. NOTE: we use [pi-blaster](https://github.com/sarfata/pi-blaster),
the gpio numbers might be different, so we recommend that you test the gpio pins first.

Note that the started and failure statuses will be blinking.

When the led strip is on the success status for 5 minutes,
it will go to the "neutral". This so it the light doesn't have to be super bright when not used for a while.

```json
        "LedStrip": {
            "globalConfig": {
                "gpioPinRed": 23,
                "gpioPinGreen": 24,
                "gpioPinBlue": 18,
                "_comment": "everything below is optional",
                "colors": {
                    "failure": {
                        "r": 255,
                        "g": 0,
                        "b": 0,
                        "intensity": 100
                    },
                    "success": {
                        "r": 0,
                        "g": 255,
                        "b": 0,
                        "intensity": 100
                    },
                    "started": {
                        "r": 255,
                        "g": 50,
                        "b": 0 ,
                        "intensity": 100
                    },
                    "_comment": "The neutral color is shown after 5 minutes of success",
                    "neutral": {
                        "r": 0,
                        "g": 255,
                        "b": 0,
                        "intensity": 30
                    }
                }
            },
        }
```

[Back to the top](#modules)

## TrafficLight

Display the status of your board with a traffic light. Requires a green, orange and red light bulb. Requires 3 GPIO
pins connected to a on/off relay.

```json
        "TrafficLight": {
            "globalConfig": {
                "gpioPinRedLight": 11,
                "gpioPinOrangeLight": 12,
                "gpioPinGreenLight": 13
            }
        }
```

[Back to the top](#modules)

## PowerUp

Power a module for a couple of seconds for the events you configured. Maybe flash a beacon light for every status
change? Requires a gpio pin connected to a relay.

```json
        "PowerUp": {
            "events": [
                {
                    "on": {
                        "status": "started"
                    },
                    "do": {
                        "powerForMiliSeconds": 5000,
                        "gpioPin": 14
                    }
                },
                {
                    "on": {
                        "status": "failure"
                    },
                    "do": {
                        "powerForMiliSeconds": 5000,
                        "gpioPin": 15
                    }
                }
            ]
        }
```

**Note**: You can choose what gpio pin to switch on for a configured duration per matched event. This way you are
not limited in the amount of relay switches you want to power on.

[Back to the top](#modules)

## HueLight

@todo: Missing config.

[Back to the top](#modules)
