# Connecting CI

## Linking GitLab

To push GitLab build statuses to the CIMonitor, you need to configure a web-hook in GitLab under the project settings.
Enter a URL to your running CIMonitor instance ending on `/gitlab`. So for example: `https://ci.example.org/gitlab`.
Make sure you push pipeline and build/job statuses.

*Note*: there is no support yet for a token, so un-check that option.

With build/job and pipeline statuses checked, the CIMonitor should fill up with all your builds!

In order to have proper build icons, please start your stage names with the following:

- default: Will show a testing bulldozer
- `build`: Will show a container (for example: when building your docker image)
- `deploy`: Will show a rocket ship
- `acceptance`: Will show a testing bulldozer
- `tag`: Will show a tagging label (for example: when tagging your docker image for production)
- `production`: Will show a rocket ship

## Send CI statuses via the API

1. Configure your test and deployment environments to push status
    updates to your running machine, by posting to `/status`:
    ```json
    {
        "project": "CIMonitor",
        "branch": "master",
        "type": "deploy OR test",
        "status": "started OR failure OR success",
        "note": "This field is optional"
    }
    ```
1. Now for every build, the dashboard should display the status!
