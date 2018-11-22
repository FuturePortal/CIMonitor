# Traffic light

![traffic light demo](../img/traffic-light.gif)

This module will give your traffic light the color of the global status of CIMonitor.

- When there is an error status, the red light will be on
- When there is a warning status, the orange light will be on
- When there are no errors or warnings, the green light will be on

Only one light will be on at the time!

## Requirements

In order to use this module, the following requirements must be present:

### Raspberry-pi

You need to run either the `server` or `server-slave` on a raspberry pi. Configure this module
for the application running on the Raspberry pi.

### pi-blaster

To control the relay board, CIMonitor requires you to have pi-blaster installed.
Check the [pi-blaster repository](https://github.com/sarfata/pi-blaster) and make sure it is
installed on your Raspberry pi.

### relay board

![](https://www.trafex.nl/wp-content/uploads/2014/08/2014-08-22-13.29.36.jpg)

You need a relay board connected to your raspberry as described in
[Tim de Pater's blog post](https://www.trafex.nl/2014/08/25/connect-a-relay-board-to-your-raspberry-pi/).
CIMonitor will use pi-blaster to control the relays though instead of the `gpio` api.

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
