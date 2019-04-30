# Requirements

Setting up CIMonitor is quick and easy. You need to have the following packages before we can get started:

-   [make](https://www.gnu.org/software/make/) (should already be present on linux and osx in developers mode)
-   [yarn](https://yarnpkg.com/): alternative to npm
-   [node](https://nodejs.org/en/download/): version 8 or higher (recommended
    to install via [NVM](https://github.com/creationix/nvm#installation))

# Download and prepare

Clone or download the latest CIMonitor via [github.com/cimonitor/cimonitor](https://github.com/cimonitor/cimonitor)
(press the green button).


## Configuration
In the folder you just downloaded, you need to create the primary config file. Create the file
`config/config.json` in the project directory. You could also copy the `config.example.json` file
you find there.

Make sure at least the following configuration is in your config file:

```json
{
    "server": {
        "port": 9999
    },
    "triggers": [],
    "events": [],
    "modules": []
}
```

For advanced configuration options, check out [the configuration page](configuration.md).
To store the config in Google Firebase instead of a local JSON file, see [the Firebase page](Firebase.md).


Open your terminal in the folder you just downloaded, and run the following command:

```sh
$ make build-production
```

This will download the required dependencies, and build the project files.

# Run the server application

Now that you have everything prepared, you can start the server application with the following command:

```sh
$ node server/server.js
```

You can now visit the dashboard via the browser at the given URL, or push statuses directly to the configured port.

If you want to run the application as a service, check out the [run as a service page](run-as-service.md). This way the
monitor will keep running without having to keep a terminal open.

# Updating server application

Easiest update would be using git, where you can just pull the latest version from master. If you downloaded a zip
file, make sure you copy the following files to the new files:

-   `config/config.json`
-   `config/saved-statuses.json`

**Note:** After you pulled the updates, always run the production build again:

```sh
$ make build-production
```

Restart your server application and that's it!
