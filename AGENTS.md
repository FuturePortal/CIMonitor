# CIMonitor

CIMonitor is a dashboard that brings all automated processes together in an dashboard overview. Automated processes such
as:

- GitLab CI Pipelines
- GitHub actions
- ReadTheDocs deployments

Each of the above items will have a Status bar, that can contain the following children:

- Status
  - Process
    - Stage
      - Job

The state is determined by the children.

## Frontend

The frontend is a React dashboard build with Parcel. Statuses are fed to the frontend using a socket connection with the
backend.

## Backend

The backend is an express application. It has a StatusManager, that handles all the statuses, their children and the
states. And also provides webhooks for external services to connect to (such as GitHub, GitLab, etc). There also are
some API endpoints available for the frontend to use, next to the socket connection for the status updates.

## Docker

We export two kinds of docker containers:

- `cimonitor/server`: runs a CIMonitor dashboard server with StatusManager and dashboard
- `cimonitor/module-client`: Runs a CIMonitor dashboard that listens to status changes of a CIMonitor server

Each version is built and pushed to the docker hub. Also both images have a `latest` tag.
