# GPIO

The GPIO module switches a GPIO pin of the device running the module client, for example to turn on a beacon light or
a relay when a pipeline succeeds or fails.

```json
{
	"type": "gpio",
	"pin": 17,
	"mode": "on-for",
	"duration": 10000
}
```

| Option     | Description                                                                                  |
| ---------- | -------------------------------------------------------------------------------------------- |
| `pin`      | The BCM GPIO number of the pin, see [pin numbering](#pin-numbering)                          |
| `mode`     | `on`, `off`, `on-for` or `off-for`                                                           |
| `duration` | Only for `on-for` and `off-for`: how long to keep the pin switched, in milliseconds (`5000`) |

`on` drives the pin low and `off` drives the pin high. Most relay boards are active-low, so `on` switches the relay on.

## Requirements

The module client uses [libgpiod](https://libgpiod.readthedocs.io/), which is included in the `cimonitor/module-client`
docker image. Nothing has to be installed on the host. Pass the GPIO character device to the container:

```shell
docker run --device /dev/gpiochip0 ... cimonitor/module-client:latest
```

By default the module uses `gpiochip0`, which holds the header pins on all Raspberry Pi models with a recent kernel.
Set the `GPIO_CHIP` environment variable to use a different chip, for example `gpiochip4` on a Raspberry Pi 5 with a
kernel older than 6.6.47. Run `gpiodetect` and `gpioinfo` on the host to find out which chips and lines are available.

## Pin numbering

Pins are addressed by their BCM GPIO number, as printed on most pinout diagrams and on [pinout.xyz](https://pinout.xyz).
Earlier versions of CIMonitor used WiringPi numbering. If you are upgrading, convert your pins using the table below.

| WiringPi | BCM (use this) | Header pin |
| -------- | -------------- | ---------- |
| 0        | 17             | 11         |
| 1        | 18             | 12         |
| 2        | 27             | 13         |
| 3        | 22             | 15         |
| 4        | 23             | 16         |
| 5        | 24             | 18         |
| 6        | 25             | 22         |
| 7        | 4              | 7          |
| 21       | 5              | 29         |
| 22       | 6              | 31         |
| 23       | 13             | 33         |
| 24       | 19             | 35         |
| 25       | 26             | 37         |
| 26       | 12             | 32         |
| 27       | 16             | 36         |
| 28       | 20             | 38         |
| 29       | 21             | 40         |

## Testing

You can test your wiring from the host with libgpiod's tools (`apt install gpiod`). The line stays driven for as long as
the command runs:

```shell
gpioset --chip gpiochip0 --hold-period 5s 17=0
```
