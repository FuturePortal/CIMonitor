# GitLab

![Pipeline example](../img/gitlab/webhook-status.gif)

When you have your CIMonitor running, it's very easy to push your GitLab builds to the CIMonitor.

GitLab needs to push the webhook to the following endpoint on the CIMonitor: `/webhook/gitlab`

**Note:** GitLab can not push webhooks to your localhost! You need to expose your server address to
the public first. This can be done via [port forwarding](https://lmgtfy.com?q=port+forwarding).

## Project settings

Open your project integration settings in gitlab:

![Integration settings menu](../img/gitlab/integration-settings.png)

## Add webhook

Add the webhook as in the following example. Make sure you check the "pipeline" and "job" events.

![Webhook configuration example](../img/gitlab/configure-webhook.png)

**Note:** Only check the "SSL verification" if your CIMonitor is running on https!

There is no support for a secret token.

## Finished webhook

![Finished webhook example](../img/gitlab/finished-webhook.png)

Now when you run a pipeline the statuses will be pushed to your CIMonitor!
