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

# V1 TODO

* ~~Create~~ `MarbleRun` module
* Create `LedStrip` module
* ~~Create~~ `TrafficLight` module
* Create `PowerUp` module
* Abstract the modules to their own repo
* Create demo video

# Demo video

@todo

# Features

* Push all your test/deployment statuses to a dashboard
* Hook up some epic modules to have fun with your statuses

# Setup & Configuration

### Run the dashboard

1. Download CIMonitors source code onto your raspberry pi (or other
   machine)
1. Run `npm install --production`
1. Copy the config file (`cp app/Config/config.dist.json
    app/Config/config.json`) and make changes accordingly.
1. To start the server, run `node app/server.js`.
1. The dashboard is now available on the port you provided.

### Send CI statuses to the dashboard

1. Configure your test and deployment environments to push status
   updates to your running machine, by posting to `/status`.
1. Now for every build, the dashboard should display the status!

### Hook up modules (optional)

To add a status module to your application, you need to provide the
configuration for that module in the global config file
(`app/Config/config.json`) in the statusModules object:

```json
{
    /* global config... */

    /* configure your modules */
    "statusModules": {
        /* add your module here */
    }
}
```

# Modules

Currently modules are pre-installed in the repository, later this will be npm modules so can be added with ease.

### MarbleRun

Run a (or multiple) marble(s) for every event you configured. Requires one GPIO port which is connected to a relay.
The relay will turn on for a limited time, releasing a marble into the track.

```json
        "MarbleRun": {
            "globalConfig": {
                "oneMarbleFireTime": 390,
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
                }
                /* Add more events if wanted */
            ]
        }
```

### LedStrip

Display the status of your board with a led-strip. Red for a failure, orange for an active process, and green for success!

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

Power a module for a couple of seconds for the events you configured. Maybe flash a beacon light for every status change?

# Development

If you want to run this project in development mode, all you need to do
is run `npm install && npm install -g gulp` once, and then `gulp` to
start the project and run file watchers.

To emulate statuses sent to the dashboard, there is a postman collection
available [here](https://www.getpostman.com/collections/773cb5cad1199fd0149d).
