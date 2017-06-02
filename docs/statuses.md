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
- **type**: `test`, `deploy`, `tag`, `build`, or a stage name

# Status trigger configuration
