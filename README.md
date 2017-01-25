![CI Monitor](https://cloud.githubusercontent.com/assets/6495166/14582332/071b3286-0402-11e6-9104-144f5e150189.png)
===

The CI Monitor is a place where all your project statuses come together.
Check if all tests have passed, and if deployments are successful. All
in one overview.

![Dashboard example](https://cloud.githubusercontent.com/assets/6495166/14587781/7bbef534-04b9-11e6-9835-e85f0a05efa8.png)

And if that's not enough for you, why not attach some epic hardware
that will represent the status of your projects! Attach a traffic
light, run marbles when a deployment is successful. The sky is the
limit!

# Features

* Push all your test/deployment statuses to a real-time dashboard
* Hook up some epic status modules to have fun with your statuses

# Setup & Configuration

### Setup & Run the dashboard

1. Download CIMonitors source code onto your raspberry pi (or other
   machine)
1. Run `npm install --production`
1. Make sure you have [pi-blaster](https://github.com/sarfata/pi-blaster) running on your pi
1. Copy the config file (`cp app/Config/config.dist.json
    app/Config/config.json`) and make changes accordingly.
1. To start the server, run `node app/server.js`.
1. The dashboard is now available on the port you provided.

### Linking GitLab

To push GitLab build statuses to the CIMonitor, you need to configure a web-hook in GitLab under the project settings.
Enter a URL to your running CIMonitor instance ending on `/gitlab`. So for example: `https://ci.example.org/gitlab`.
Note that there is no support yet for a token, so uncheck that option.

With build statuses checked, the CIMonitor should fill up with all your builds!

### Send CI statuses to the dashboard

1. Configure your test and deployment environments to push status
   updates to your running machine, by posting to `/status`:
```json
{
    "project": "CIMonitor",
    "branch": "master",
    "type": "deploy OR test",
    "status": "started OR failure OR success",
    "note": "This field is optional"
}
```
2. Now for every build, the dashboard should display the status!

### Hook up modules (optional)

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

### Listen to another CIMonitor

In case you want to have a second raspberry pi running, but listen to the same statuses, you can provide a web hook
URL to the other running CIMonitor. That way all the statuses that are pushed to the dashboard, are pushed to the
second CIMonitor instance as well. To make this work, add a listen URL in your config:

```json
{
    "listenUrl": "http://ci.example.org"
}
```

The same URL should be used as the status dashboard.

# Modules

Currently modules are pre-installed in the repository, later this will be npm modules so can be added with ease.

### MarbleRun

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

### LedStrip

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

### TrafficLight

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

### PowerUp

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

# Development

If you want to run this project in development mode, all you need to do
is run `npm install && npm install -g gulp` once, and then `gulp` to
start the project and run file watchers.

To emulate statuses sent to the dashboard, there is a postman collection
available [here](https://www.getpostman.com/collections/773cb5cad1199fd0149d).
