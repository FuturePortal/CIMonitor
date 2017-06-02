# Installing raspberry PI 3 model B

To start off, we expect you to have Raspbian installed. This can easily be done via
NOOBS from https://www.raspberrypi.org/downloads/noobs/. Handy video for that:
https://www.raspberrypi.org/help/noobs-setup/

Once you have completed the installation, you can follow the steps below to have a fully working CIMonitor.

## Change password

Just type `passwd` and you can configure a new password.

## Vim

If you want to use nano, feel free, but I like to use vim. If you want to use nano, replace vim in all commands below.

`sudo apt-get install vim`

## Static IP

Set a static IP in raspbian is a bit different than editing your `/etc/network/interfaces`, you need to edit `dhcpcd.conf`:

`sudo vim /etc/dhcpcd.conf`
Add to the bottom of the file (replace the addresses with the ones you need):
```
interface eth0
static ip_address=172.17.0.53
static routers=172.17.0.1
static domain_name_servers=172.17.0.1
```

`sudo reboot` to reboot with your static IP.

## Enable external SSH access (optional)

If you want to access your raspberry remotely, we need to enable external SSH access. Check out the
[raspberry documentation for this](https://www.raspberrypi.org/documentation/remote-access/ssh/).

## Set timezone

`$ sudo cp /usr/share/zoneinfo/Europe/Amsterdam /etc/localtime`

## Rotate screen

If you want to rotate your screen to have more statuses displayed. 1 = 90 degrees, 3 = 270 degrees.

`sudo vim /boot/config.txt`
```
display_rotate=3
```
`sudo reboot` to test your changes

## No screen blanking

Disable the screen from going blank.

`sudo vim /etc/lightdm/lightdm.conf`

find `[SeatDefault]` and place under it:
`xserver-command=X -s 0 dpms`

## Install nodejs & npm

`sudo apt-get install nodejs-legacy npm`

## Download CIMonitor

1. `$ cd ~`
1. [Create a new git key](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)
   and add it to your github account. (or download the zip and unzip)
1. `$ git clone git@github.com:CIMonitor/CIMonitor.git`
1. `$ cd CIMonitor/`
1. `$ cp app/Config/config.dist.json app/Config/config.json`
1. `$ vim app/Config/config.json` and make the required changes.
1. `$ npm install --production`
1. You can now test if the app runs with `node app/server.js`

## Install [pi-blaster](https://github.com/sarfata/pi-blaster)

1. Follow the installation instructions on the Github Repo so you end up with `/usr/sbin/pi-blaster`.
1. Make sure you ran `sudo make install` so the systemd service script has been created and is auto started on boot.
1. `$ sudo vim /lib/systemd/system/pi-blaster.service` and change the ExecStart so it reads as follows:
    ```
    ExecStart=/bin/sh -c "/bin/sleep 20 && /usr/sbin/pi-blaster $DAEMON_ARGS"
    ```

## Run node as a service

1. `$ sudo npm install pm2 -g` - Install the `pm2` service manager, that lets you start node applications as a service.
1. `$ sudo pm2 startup` - Create a systemd service file with `$ sudo pm2 startup` and run the command that follows.
1. `$ sudo systemctl enable pm2-root` - Let pm2 start on boot.
1. `$ sudo vim /etc/systemd/system/pm2-root.service`, add `pi-blaster.service` (separated by space) behind the line that reads `After=`
1. `$ sudo pm2 start /home/pi/CIMonitor/app/server.js --name CIMonitor`
1. `$ sudo pm2 save`

## Start CIMonitor dashboard full-screen

Install unclutter so we can hide the mouse:
`$ sudo apt-get install unclutter`

`sudo vim /home/pi/.config/lxsession/LXDE-pi/autostart`
Insert the following content (replace everything):
```
@xset s off
@xset -dpms
@xset s noblank
@unclutter
@chromium-browser --incognito --kiosk http://localhost:3000/
```

## Done!

If you restart your raspberry, it should start the CIMonitor application now and start the browser in full screen mode.

`sudo reboot`
