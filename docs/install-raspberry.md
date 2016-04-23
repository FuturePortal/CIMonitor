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

`sudo vim ~/.vimrc`

```
" ---------------
" General
" ---------------
set nocompatible
set encoding=utf-8

" ---------------
" User Interface
" ---------------
syntax on
set number
set nowrap
set background=dark
set showcmd
set ttyfast
set lazyredraw

" ---------------
" Text Format
" ---------------

" Correct tab and indent settings, use 4 spaces instead of tabs
set expandtab
set tabstop=4
set softtabstop=4
set shiftwidth=4
set smarttab
set shiftround
set autoindent
set smartindent

" ---------------
" Remove trailing whitespaces on save
" ---------------
autocmd BufWritePre * :%s/\s\+$//e
```

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

See ReadMe.

### Run node as a service

`pm2`

### Full screen browser

Start your browser full screen

1. `sudo apt-get install xautomation unclutter`
1. `vim ~/start-browser-fullscreen.sh`

   ```sh
   sudo -u pi epiphany-browser -a -i --profile ~/.config http://localhost:3000 --display=:0 &
   sleep 15s;
   xte "key F11" -x:0
   ```
1. `sudo chmod +x ./start-browser-fullscreen.sh`
1. `sudo vim ~/.config/lxsession/LXDE-pi/autostart`

   ```
   @xset s off
   @xset -dpms
   @xset s noblank
   @/home/pi/start-browser-fullscreen.sh
   ```
