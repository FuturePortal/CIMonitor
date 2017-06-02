# Setup & Run the dashboard

If you have a Raspberry PI 3, we strongly recommend that you follow the "Setup Raspberry" tutorial.

1. `$ git clone git@github.com:CIMonitor/CIMonitor.git`
1. `$ cd CIMonitor/`
1. `$ cp app/Config/config.dist.json app/Config/config.json`
1. `$ vim app/Config/config.json` and make the required changes.
1. `$ npm install --production`
1. `$ node app/server.js` to run the application
1. You can now access [localhost:3000](http://localhost:3000/)
