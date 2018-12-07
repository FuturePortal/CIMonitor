# Led strip

@todo: demo image

The led-strip module will color your led-strip with the global status color of the CIMonitor.

- When there is an error status, the led-strip wil pulse red
- When there is a warning status, the led-strip will pulse orange
- When there are no errors or warnings, the led-strip will be green (but dimmed)
- When a new success status is pushed, the led-strip will be bright green for 5 minutes

## Requirements

In order to use this module, the following requirements must be present:

### Raspberry-pi

You need to run either the `server` or `module-client` on a raspberry pi. Configure this module
for the application running on the raspberry-pi.

### pi-blaster

To control the amount of color that needs to be sent to the led-strip, CIMonitor requires
you to have pi-blaster installed. Check the
[pi-blaster repository](https://github.com/sarfata/pi-blaster) and make sure it is
installed on your Raspberry pi.

### led strip setup

In order for CIMonitor to control the color of a led-strip, the following setup is required:

![](https://dordnung.de/raspberrypi-ledstrip/img/rgb/small/finished_2.jpg?ver=1.0)

See exactly how to do this at:
[dordnung.de/raspberrypi-ledstrip/](https://dordnung.de/raspberrypi-ledstrip/)

## Configuration

To enable this module, add the module to the `server/config/config.json`:

```json
{
    "modules": [
        {
            "name": "LedStrip",
            "config": {
                "gpioPinRed": 10,
                "gpioPinGreen": 11,
                "gpioPinBlue": 12
            }
        }
    ]
}
```

The `config` object must be configured as following:

| key            | required? | description                                                  |
| -------------- | --------- | ------------------------------------------------------------ |
| `gpioPinRed`   | yes       | The GPIO pin number on the raspberry-pi for the red color.   |
| `gpioPinGreen` | yes       | The GPIO pin number on the raspberry-pi for the green color. |
| `gpioPinBlue`  | yes       | The GPIO pin number on the raspberry-pi for the blue color.  |

Restart the application to enable the module.
