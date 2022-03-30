# Running on a Raspberry Pi

To run CIMonitor on a Raspberry Pi (or any other ARM device), we also build special `-arm` tags on our docker containers.
All you have to do is prepend `-arm` to the version you want to run. So on your raspberry you could just run
`docker run cimonitor/server:latest-arm` or `docker run cimonitor/server:4.0.0-arm`. Check the
[docker documentation](./docker.md) on how to fully run CIMonitor, and make sure you prepend the `-arm` tag.

You could also do a [local installation](./locally.md) of course. That will work to on your ARM device.

## Installation of CIMontor + display on your Pi

Fist of all, you need Raspbian running on your Raspberry Pi, check [the raspberry site on how to install the latest
software](https://www.raspberrypi.com/software/).

Once you have completed the installation, you can follow the steps below to have a fully working CIMonitor.

## Update operating system

As with all newly installed system, you first want to make sure everything is up-to-date:
`# apt-get update && apt-get upgrade`

## Change password

Just type `passwd` and you can configure a new password.

## Vim

If you want to use nano, feel free, but I like to use vim. If you want to use nano, replace vim in all commands below.

`# apt-get install vim`

## Enable external SSH access (optional)

If you want to access your raspberry remotely, we need to enable external SSH access. Check out the
[raspberry documentation for this](https://www.raspberrypi.org/documentation/remote-access/ssh/).

## Rotate screen

If you want to rotate your screen to have more statuses displayed. 1 = 90 degrees, 3 = 270 degrees.

`# vim /boot/config.txt`

```
display_rotate=3
```

`# reboot` to test your changes

## No screen blanking

Disable the screen from going blank.

`# vim /etc/lightdm/lightdm.conf`

find `[SeatDefault]` and place under it:
`xserver-command=X -s 0 dpms`

## Install docker

Install docker following [the official docker installation guide](https://docs.docker.com/engine/install/debian/).

## Run CIMonitor server container

1. First, create a folder where you want to run the container: `# mkdir ~/CIMonitor`
2. Navigate to the new folder so you can always find the saved statuses: `# cd ~/CIMonitor`
3. See the [docker documentation](./docker.md) on what start command you should run. Don't forget to append `-arm` to
   the docker tag.
4. You should now have CIMonitor running on the Raspberry Pi on port 3030.

## Start CIMonitor dashboard full-screen

Install unclutter so we can hide the mouse:
`# apt-get install unclutter`

`# vim /home/pi/.config/lxsession/LXDE-pi/autostart` replace everything:

```
@xset s off
@xset -dpms
@xset s noblank
@unclutter
@chromium-browser --enable-experimental-web-platform-features --kiosk --app=http://localhost:3030/
```

## Done!

If you restart your raspberry, it should start the CIMonitor application now and start the browser in full screen mode.

`# reboot`

Now you can start pushing webhooks to your raspberry pi. Just make sure the services can push via the public internet.
You might have to learn about port forwarding. Ask a friend or search on Youtube/Google.
