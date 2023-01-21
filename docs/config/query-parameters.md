# Query parameters

If you're linking or embedding a CIMonitor instance, you might want to "force" some settings. To achieve this some
query parameters are available for you.

## Available query parameters

| Parameter | What does it do                             | values                   |
| --------- | ------------------------------------------- | ------------------------ |
| completed | Show completed CI steps (hidden by default) | `1` to show, `0` to hide |
| avatars   | Show user avatars                           | `1` to show, `0` to hide |

## How to use them

Adding query parameters to your URL works as follows:

`<your_ci_monitor_url>?<setting_1>=1&<setting_2>=0`

In the example above you will set `setting_1` to enabled, and `setting_2` to disabled. A complete URL would look
something like this:

`https://ci.example.com?completed=1&avatars=0`
