# GitHub

![GitHub status example](../images/status/github.png)

## Adding webhook

In your GitHub settings, open the webhooks section, and add a webhook as shown in the image below.

- _Payload URL_: `cimonitor.example.com/webhook/github` (replace your domain name)
- _Content type_: `application/json`
- _Secret_: insert the same password if you've the `WEBHOOK_SECRET` environment setting
- _What event?_: "Send me everything" to have CIMonitor working at full potential
- Make sure the webhook is active

Add your webhook! All new builds should become visible on your CIMonitor.

## Demonstration

![Add GitHub webhook demonstration](../images/webhook/github.gif)
