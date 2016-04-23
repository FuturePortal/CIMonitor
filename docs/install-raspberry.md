# Installing raspberry

I've had to reinstall the raspberry, so I thought it would be wise to document what actions I've taken to
set everything up.

I installed raspbian with NOOBS from https://www.raspberrypi.org/downloads/noobs/. Handy video for that:
https://www.raspberrypi.org/help/noobs-setup/

## Installing

I recommend you SSH into your raspberry, so you can do all this on your own pc.

### Change password

Just type `passwd` and you can configure a new password.

### Vim

If you want to use nano, feel free, but I like to use vim. If you want to use nano, replace vim in all commands below.

`sudo apt-get install vim`

### Static IP

Set a static IP in raspbian is a bit different than editing your `/etc/network/interfaces`, you need to edit `dhcpcd.conf`:

`sudo vim /etc/dhcpcd.conf`
Add to the bottom of the file:
```
interface eth0
static ip_address=172.17.0.53
static routers=172.17.0.1
static domain_name_servers=172.17.0.1
```
`sudo reboot` and ssh to your static ip

### Rotate screen

If you want to rotate your screen to have more statusses displayed. 1 = 90 degrees, 3 = 270 degrees.

`sudo vim /boot/config.txt`
```
display_rotate=3
```
`sudo reboot` to test your changes

### No screen blanking

Disable the screen from going blank.

`sudo vim /etc/lightdm/lightdm.conf`

find `[SeatDefault]` and place under it:
`xserver-command=X -s 0 dpms`

### Install nodejs & npm

`sudo apt-get install nodejs-legacy npm`

### Download CIMonitor

1. `cd ~`
1. `mkdir CIMonitor`
1. [Create a new git key](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)
   and add it to your github account. (or download the zip and unzip)
1. `git clone git@github.com:CIMonitor/CIMonitor.git`
1. cd `CIMonitor/`
1. `cp app/Config/config.dist.json app/Config/config.json`
1. `vim app/Config/config.json` and make the required changes.
1. `npm install`
1. You can now test if the app runs with `node app/server.js`

### Run node as a service

Install the `pm2` service manager, that lets you start node applications as a service.

`npm install pm2 -g`

### Start CIMonitor & full screen browser

Start your browser full screen

1. `sudo apt-get install xautomation unclutter`
1. `vim ~/start-cimonitor.sh`

   ```sh
   pm2 start /home/pi/CIMonitor/app/server.js --name CIMonitor && sleep 30s;
   sudo -u pi epiphany-browser -a -i --profile ~/.config http://localhost:3000 --display=:0 &
   sleep 15s;
   xte "key F11" -x:0
   ```
1. `sudo chmod +x ./start-cimonitor.sh`
1. `sudo vim ~/.config/lxsession/LXDE-pi/autostart`

   ```
   @xset s off
   @xset -dpms
   @xset s noblank
   @/home/pi/start-cimonitor.sh
   ```

### Done!

If you restart your raspberry, it should start the CIMonitor application now and start the browser in full screen mode.

`sudo reboot`
