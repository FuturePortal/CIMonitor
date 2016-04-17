![CI Monitor](https://cloud.githubusercontent.com/assets/6495166/14582332/071b3286-0402-11e6-9104-144f5e150189.png)
===

The CI Monitor is a place where all your project statuses come together.
Check if all tests have passed, and if deployments are successful. All
in one overview.

And if that's not enough for you, why not attach some epic hardware
that will represent the status of your projects! Attach a traffic
light, run marbles when a deployment is successful. The sky is the
limit!

# V1 TODO

* Create dashboard styling
* Create dashboard status handler
* Make it possible to hook up epic modules
* Create `MarbleRun` module
* Create `LedStrip` module
* Create `TrafficLight` module
* Create `PowerUp` module
* Introduce config file
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
1. Configure your config file (example below)
1. To start the server, run `node app/server.js`.
1. The dashboard is now available on the port you provided.

```json
{
    "config-example": "@todo"
}
```

### Send CI statuses to the dashboard

1. Configure your test and deployment environments to push status
   updates to your running machine, by posting to `/status`.
1. Now for every build, the dashboard should display the status!

### Hook up modules

@todo

# Available extensions

Of course you're able to add your own extensions as well, but why not
use some modules we already made for you?

Module | What does it do? | Link
------ | ---------------- | ----
MarbleRun | Run a (or multiple) marble(s) for every event you configured. | @todo
LedStrip | Display the status of your board with a led-strip. Red for a failure, orange for an active process, and green for success! | @todo
TrafficLight | Display the status of your board with a traffic light. Requires a green, orange and red light bulb. | @todo
PowerUp | Power a module for a couple of seconds for the events you configured. Maybe flash a beacon light for every status change? | @todo

Did you create a module yourself, and added it to github and npm? Feel
free to submit a PR and extend the extensions list.

# Development

If you want to run this project in development mode, all you need to do
is run `npm install && npm install -g gulp` once, and then `gulp` to
start the project and run file watchers.
