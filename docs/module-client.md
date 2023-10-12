# Module client

In this documentation we will teach you how to run a module-client on a Raspberry Pi. Note that this is
not very complete information yet, but it should give you some pointers at least.

## Install docker

https://docs.docker.com/engine/install/raspberry-pi-os/#install-using-the-repository

## Using GPIO modules?

http://wiringpi.com/download-and-install/

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
					"pin": 7,
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
    --privileged \
    --detach \
    --restart unless-stopped \
    --name CIMonitorClient \
    --volume $(pwd)/storage:/CIMonitor/storage \
    --volume /usr/bin/gpio:/usr/bin/gpio \
    --volume /lib/libwiringPiDev.so:/lib/libwiringPiDev.so \
    --volume /lib/libwiringPi.so:/lib/libwiringPi.so \
    --volume /dev/mem:/dev/mem \
    --volume /dev/gpiomem:/dev/gpiomem \
    --env CIMONITOR_SERVER_URL="https://ci.example.com" \
    cimonitor/module-client:latest-arm
```
