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
CIMonitor 4.x and earlier used WiringPi numbering. If you are upgrading, convert the `pin` values in your `modules.json`
using the table below. Nothing changes in your wiring, the header pin stays the same. If you still have WiringPi
installed, `gpio readall` prints the `wPi` and `BCM` columns side by side for your board.

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

## Only one process can drive a pin

The module client keeps a pin claimed while the module client container is running. Host tools such as WiringPi's
`gpio` or libgpiod's `gpioset` cannot drive the same pin at that time and the client cannot claim a pin held by another
process. Stop the container before testing pins from the host. `gpioinfo` on the host shows which pins are in use and
lists the ones held by the module client with consumer `CIMonitor`.

## Testing

You can test your wiring from the host with libgpiod's tools (`apt install gpiod`) while the module client container is
stopped. Drive GPIO17 low for 5 seconds, which turns on an active-low relay:

```shell
# libgpiod 2.x (Raspberry Pi OS Trixie and newer)
gpioset --chip gpiochip0 --hold-period 5s 17=0

# libgpiod 1.x (Raspberry Pi OS Bookworm and older)
gpioset --mode=time --sec=5 gpiochip0 17=0
```

Check which version you have with `gpioset --version`.
