# Setup & Run the dashboard

1. Download CIMonitors source code onto your raspberry pi (or other
   machine)
1. Run `npm install --production`
1. Make sure you have [pi-blaster](https://github.com/sarfata/pi-blaster) running on your pi
1. Copy the config file (`cp app/Config/config.dist.json
    app/Config/config.json`) and make changes accordingly.
1. To start the server, run `node app/server.js`.
1. The dashboard is now available on the port you provided.

To have a complete raspberry pi installation, check out the "Setup Raspberry" item in the menu.
