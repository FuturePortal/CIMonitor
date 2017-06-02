# Statuses

For every incoming CI status, a status if emit in the application. These statuses will be picked up
by the status-modules configured for the project.

# Status module statuses

The statuses that will be pushed internally are an object with the following properties:

- **project**: The name of the project the status is triggered for
- **branch**: The branch of the project the status is triggered for
- **source**: `api` when the status is pushed to the application directly. `pipeline`, `stage`, or `job` when
  the status is pushed via a GitLab webhook.
- **status**: `success`, `started`, or `failure`
- **type**: `test`, `deploy`, `tag`, `build`, or the projects stage name in case of a GitLab webhook

# Status trigger configuration

Some status modules work by the general status. The LedStrip module for example, will make the led strip red when
there is a `failure` status, yellow when there is a `started` status, or green when everything succeeded. Some
modules however can be configured per status trigger. This looks like the following:

```json
"events": [
    {
        "on": {
            "status": "success",
            "type": "deploy"
        },
        "do": {
            "_comment": "module config here"
        }
    },
    "_comment": "You can add as may events as you want"
]
```

As you can see in the example above, the event for the StatusModule is triggered when the `status` is equal to
`success`, and the `type` is equal to `deploy`. When both of those match for the triggered status, the `do`
part will be executed for the StatusModule. In the `on` section you can define any of the status module 
properties. This way you can create specific events for specific statuses.

Check out the StatusModules documentation to see for which status modules this can be used.
