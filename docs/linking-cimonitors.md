# Listen to another CIMonitor

In case you want to have a second raspberry pi running, but listen to the same statuses, you can provide a web hook
URL to the other running CIMonitor. That way all the statuses that are pushed to the dashboard, are pushed to the
second CIMonitor instance as well. To make this work, add a listen URL in your config:

```json
{
    "listenUrl": "http://ci.example.org"
}
```

The same URL should be used as the status dashboard.
