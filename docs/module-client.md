# Module client

In this documentation we will teach you how to run a module-client on a Raspberry Pi. Note that this is
not very complete information yet, but it should give you some pointers at least.

## Install docker

https://docs.docker.com/engine/install/raspberry-pi-os/#install-using-the-repository

## Using GPIO modules?

Nothing has to be installed on the Raspberry Pi itself. The module client container ships with
[libgpiod](https://libgpiod.readthedocs.io/) and talks to the GPIO character device (`/dev/gpiochip0`) that you pass
to the container. See the [GPIO module documentation](./module/gpio.md) for the pin numbering and options.

## Starting CIMonitor on a display (optional)

```shell
sudo vim /etc/xdg/lxsession/LXDE-pi/autostart
```

and insert the contents:

```
@xset s off
@xset -dpms
@xset s noblank
@chromium-browser --kiosk https://ci.example.com
```

you might also want to hide the mouse, install unclutter:

```shell
sudo apt install unclutter
```

## Running module client

Create a CIMonitor folder on your PI:

```shell
mkdir ~/CIMonitor;
cd ~/CIMonitor;
```

## Create module config

Create a `~/CIMonitor/storage/modules.json`:

```json
{
	"triggers": [
		{
			"status": {
				"state": "success",
				"branch": "master"
			},
			"event": "celebrate"
		},
		{
			"status": {
				"state": "success",
				"branch": "main"
			},
			"event": "celebrate"
		},
		{
			"status": {
				"state": "success",
				"branch": "production"
			},
			"event": "celebrate"
		}
	],
	"events": [
		{
			"name": "celebrate",
			"modules": [
				{
					"type": "gpio",
					"pin": 4,
					"mode": "on-for",
					"duration": 10000
				}
			]
		}
	]
}
```

## Start docker container

There, run the CIMonitor module client:

```shell
docker run \
    --detach \
    --restart unless-stopped \
    --name CIMonitorClient \
    --volume $(pwd)/storage:/CIMonitor/storage \
    --device /dev/gpiochip0 \
    --env CIMONITOR_SERVER_URL="https://ci.example.com" \
    cimonitor/module-client:latest
```

The `--device /dev/gpiochip0` flag gives the container access to the GPIO pins, `--privileged` is not needed. On a
Raspberry Pi 5 with a kernel older than 6.6.47 the header pins live on `gpiochip4` instead. Pass that device and set
`--env GPIO_CHIP=gpiochip4` in that case.
