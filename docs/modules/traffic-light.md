# Traffic light

![traffic light demo](../img/traffic-light.gif)

@todo: introduction

## Requirements

In order to use this module, the following requirements must be present:

### Raspberry-pi

You need to run either the `server` or `server-slave` on a raspberry pi. Configure this module
for the application running on the raspberry-pi.

### pi-blaster

@todo: refer to pi-blaster docs

### relay board

@todo: show image of an relay board

## Configuration

To enable this module, add the module to the `server/config/config.json`:

```json
{
    "modules": [
        {
            "name": "TrafficLight",
            "config": {
                "gpioPinRedLight": 10,
                "gpioPinOrangeLight": 11,
                "gpioPinGreenLight": 12
            }
        }
    ]
}
```

The `config` object must be configured as following:

| key                  | required? | description                                                                                   |
| -------------------- | --------- | --------------------------------------------------------------------------------------------- |
| `gpioPinRedLight`    | yes       | GPIO pin number on the raspberry-pi that controls the relay board switch for the red light    |
| `gpioPinOrangeLight` | yes       | GPIO pin number on the raspberry-pi that controls the relay board switch for the orange light |
| `gpioPinGreenLight`  | yes       | GPIO pin number on the raspberry-pi that controls the relay board switch for the green light  |

Restart the application to enable the module.
