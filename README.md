# [![image](https://cloud.githubusercontent.com/assets/6495166/26699859/947f4466-471b-11e7-9d82-9f0db072a675.png)](https://cimonitor.readthedocs.io) CIMonitor
[
    ![](https://readthedocs.org/projects/cimonitor/badge/?version=latest)
    ![](https://travis-ci.org/CIMonitor/CIMonitor.svg?branch=master)
](https://cimonitor.readthedocs.io)

The CIMonitor is a place where all your project statuses come together.
Check if all tests have passed, and if deployments are successful. All
in one overview.

The time that deployments were scary is over, lets make them FUN!

![Dashboard example](https://cloud.githubusercontent.com/assets/6495166/26514898/7aa0c6e6-4275-11e7-8c52-5a9f4e6079c3.png)

And if that's not enough for you, why not attach some epic hardware
that will represent the status of your projects! Attach a traffic
light, run marbles when a deployment is successful. The sky is the
limit!

# Features

- Push all your test/deployment statuses to a **real-time dashboard**
- Add a **GitLab webhook** to push all pipeline and build statuses with ease!
- Add some epic **status modules** to have fun with your statuses
    - **LedStrip**: Reflect your build status on a led strip
    - **MarbleRun**: Fire a marble into your marble run for the configured statuses
    - **PowerUp**: Power a device for a configured amount of time
    - **HueLight**: Change the color of your hue light relecting your statuses
    - **TrafficLight**: Have a traffic light reflecting your statuses

# Installation & documentation

All documentation on installation and setting up can be found in our online documentation at
[cimonitor.readthedocs.io](https://cimonitor.readthedocs.io).

# Development

If you want to run this project in development mode, all you need to do
is run `npm install && npm install -g gulp` once, and then `gulp` to
start the project and run file watchers.

To emulate statuses sent to the dashboard, there is a postman collection
available [here](https://www.getpostman.com/collections/773cb5cad1199fd0149d).
