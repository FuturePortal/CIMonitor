import StatusManager from 'backend/status/manager';
import { GitHubWorkflowRun } from 'types/github';
import Status from 'types/status';

import { getStateFromStatus } from './helper';

class GitHubRunParser {
    parseRun(id: string, run: GitHubWorkflowRun): Status {
        let status = StatusManager.getStatus(id);

        if (!status) {
            status = {
                id,
                project: `${run.repository.name} / ${run.organization.login}`,
                state: 'info',
                source: 'github',
                branch: run.workflow_run.head_branch,
                time: new Date().toUTCString(),
                processes: [],
            };
        }

        let processes = status.processes;

        const processId = `run-${run.workflow_run.id}`;

        if (!processes.find((process) => process.id === processId)) {
            processes.push({
                id: processId,
                title: run.workflow_run.name,
                state: 'info',
                stages: [],
                time: new Date().toUTCString(),
            });
        }

        processes = processes.map((process) => {
            if (process.id === processId) {
                return {
                    ...process,
                    state: getStateFromStatus(run.workflow_run.status, run.workflow_run.conclusion),
                };
            }

            return process;
        });

        return {
            ...status,
            userImage: run.sender.avatar_url,
            projectImage: run.organization.avatar_url,
            processes,
            time: new Date().toUTCString(),
        };
    }
}

export default new GitHubRunParser();
