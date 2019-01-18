# Deployer

[Deployer](https://deployer.org) is a deployment tool for PHP projects. CIMonitor can support updates from the 
deployments that are issued with this tool.

## Setup deployer recipe

Documentation for setting up the deployer recipe can be found at https://deployer.org/recipes/cimonitor.

### Installing

- Install the third-party recipes package with composer

```
composer require deployer/recipes --dev
```

- Include the recipe in your `deploy.php`

```
require 'recipe/cimonitor.php';
```

### Minimal setup
For minimum setup, you need to set the host and endpoint of you CIMonitor server in your deploy.php. Deployer will send 
the updates to this location. 

```
set('cimonitor_webhook', 'https://cimonitor.enrise.com/webhook/deployer');
```

To use the actual tasks, define them in your `deploy.php`

First define to send notification of a started deployment to CIMonitor with (optional):
```
before('deploy', 'cimonitor:notify');
```

Secondly define the updates on succes and failure of the deployment (recommended):
```
after('success', 'cimonitor:notify:success');
after('deploy:failed', 'cimonitor:notify:failure');
```

### Advanced
For advanced settings in your Deployer scripts, see https://deployer.org/recipes. 
