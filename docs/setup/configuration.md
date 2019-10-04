# Configuration

The configuration is created in one primary file: `config/config.json` in the project directory.

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

## Server configuration

The `server` configuration is required when you're running the `back-end/server.js` application!

```json
{
    "server": {
        "port": 9999,
        "personalAccessTokenGitLab": "",
        "password": "p4ssw0rd"
    },
```

The `server` object must be configured as following:

| key                         | required? | description                                                      |
| --------------------------- | --------- | ---------------------------------------------------------------- |
| `port`                      | yes       | The port you want the server to run on                           |
| `personalAccessTokenGitLab` | no        | A GitLab personal access token with `read_repository` permission |
| `password`                  | no        | Read more in [password protection](./password-projection)        |

## Module client configuration

The `moduleClient` configuration is required when you're running the `back-end/module-client.js` application!

```json
{
    "moduleClient": {
        "master": "http://localhost:9999/"
    },
```

The `moduleClient` object must be configured as following:

| key      | required? | description                                                                            |
| -------- | --------- | -------------------------------------------------------------------------------------- |
| `master` | yes       | The address the `server.js` application is running on, so it can connect to its socket |

## Defining modules

If you want to use one of the status modules, it's required to add them to the `"modules": []` array.
Check the module specific configuration to see what you need to add into the array.

## Defining events

Events are what can be triggered by a status. For example lets take a `celebrate-success` event. When that
event is fired, you want multiple status modules to be triggered an execute some functionality.

An event object must be added the `"events": []` array. An event object looks as following:

```json
{
    "name": "celebrate-success",
    "modules": []
}
```

| key       | required? | description                                                  |
| --------- | --------- | ------------------------------------------------------------ |
| `name`    | yes       | The name of the event                                        |
| `modules` | yes       | An array of modules that should be executed during the event |

In that event you define what modules you want to trigger in the `modules` array.

```json
{
    "name": "---module-name---",
    "push": {
        "_comment": "configuration to push to the module here"
    }
}
```

| key    | required? | description                                                                      |
| ------ | --------- | -------------------------------------------------------------------------------- |
| `name` | yes       | The name of the module you want to trigger during the event                      |
| `push` | yes       | An object with the configuration you want to push to the module during the event |

Check the module specific configuration to see what you need to add into the array for that module.

A finished event configuration could look like this:

```json
{
    "events": [
        {
            "name": "celebrate-success",
            "modules": [
                {
                    "name": "DashboardVideo",
                    "push": {
                        "youtubeKey": "ZTOIEz7p2KU",
                        "startAt": 20,
                        "duration": 20
                    }
                }
            ]
        },
    ],
```

## Defining triggers

A trigger defines on what parameters an event needs to be triggered. When all attributes in the `on`
object match, the event will be executed.

```json
{
    "triggers": [
        {
            "on": {
                "state": "success"
            },
            "targetEventName": "celebrate-success"
        },
        {
            "on": {
                "subTitle": "master",
                "state": "error"
            },
            "targetEventName": "master-error-sequence"
        }
    ],
```

| key               | required? | description                                                                                              |
| ----------------- | --------- | -------------------------------------------------------------------------------------------------------- |
| `on`              | yes       | An object containing the keys and values you want to match with the status in order to trigger the event |
| `targetEventName` | yes       | The name of the event you want to trigger for execution                                                  |
