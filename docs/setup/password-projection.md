# Password protection

If you host your CIMonitor on the public internet, you want to use password projection. Without password protection
everyone is able to submit events to your CIMonitor, and remove them.

## Set password in the config

TODO: Show config example

## Submit password in API calls

TODO: Explain that you can set an authorization header with your password in it.

## Submit password in the webhooks

Also the web hooks require the password to work. This can easily be done by adding `?token=p4ssw0rd` to the web hook
URL (replace with your actual password).

### GitLab web hook

TODO: Show example of the GitLab web hook config with a password
