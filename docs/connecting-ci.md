# Connecting CI

## Linking GitLab

To push GitLab build statuses to the CIMonitor, you need to configure a web-hook in GitLab under the project settings.
Enter a URL to your running CIMonitor instance ending on `/gitlab`. So for example: `https://ci.example.org/gitlab`.
Make sure you push pipeline and build/job statuses.

_Note_: there is no support yet for a token, so un-check that option.

With build/job and pipeline statuses checked, the CIMonitor should fill up with all your builds!

## Send CI statuses via the API

@todo: version 2 documentation needs to be added still
