# Modules

```json
{
    "triggers": [
        {
            "status": {
                "project": "CIMonitor / CIMonitor",
                "state": "success",
                "branch": "master"
            },
            "event": "celebrate"
        },
        {
            "status": {
                "project": "CIMonitor / CIMonitor",
                "state": "error",
                "branch": "master"
            },
            "event": "failure"
        }
    ],
    "events": [
        {
            "name": "celebrate",
            "modules": [
                {
                    "type": "gpio",
                    "pin": 10,
                    "mode": "on-for",
                    "duration": 10
                }
            ]
        },
        {
            "name": "failure",
            "modules": [
                {
                    "type": "gpio",
                    "pin": 18,
                    "mode": "on-for",
                    "duration": 10
                }
            ]
        }
    ]
}
```
