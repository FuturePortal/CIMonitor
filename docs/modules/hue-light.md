# Hue light

![hue light demo](../img/hue-light.gif)

This module will give your Hue light the color of the global status of CIMonitor.

- When there is an error status, the light will be red
- When there is a warning status, the light will be orange
- When there are no errors or warnings, the light will be green

## Requirements

In order to use this module, you need to have a Philips Hue light, and a Philips Hue hub!

## Configuration

To enable this module, add the module to the `config/config.json`:

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
