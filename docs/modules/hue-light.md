# Hue light

![hue light demo](../images/hue-light.gif)

@todo: introduction

## Requirements

In order to use this module, you need to have a Philips Hue light, and a Philips Hue hub!

## Configuration

To enable this module, add the module to the `server/config/config.json`:

```json
{
    "modules": [
        {
            "name": "HueLight",
            "config": {
                "hub": "---ip---",
                "path": "/api/---token---/lights/5/state"
            }
        }
    ]
}
```

The `config` object must be configured as following:

| key    | required? | description                                            |
| ------ | --------- | ------------------------------------------------------ |
| `hub`  | yes       | The IP-address of the Philips Hue hub                  |
| `path` | yes       | The path to the hue light containing the correct token |

Restart the application to enable the module.

## How to get the Hue light IP and path?

@todo: teach how to grab them from the chrome plugin
