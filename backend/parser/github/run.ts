import { isOldProcess } from 'backend/status/helper';
import StatusManager from 'backend/status/manager';
import { GitHubWorkflowRun } from 'types/github';
import Status from 'types/status';

import { getStateFromStatus } from './helper';

class GitHubRunParser {
	parse(id: string, run: GitHubWorkflowRun): Status | null {
		let status = StatusManager.getStatus(id);

		if (!status) {
			status = {
				id,
				project: `${run.organization.login} / ${run.repository.name}`,
				state: 'info',
				source: 'github',
				branch: run.workflow_run.head_branch,
				time: new Date().toUTCString(),
				processes: [],
			};
		}

		let processes = status.processes;

		const processId = run.workflow_run.id;

		if (!processes.find((process) => process.id === processId)) {
			if (isOldProcess(status, processId)) {
				return null;
			}

			processes.push({
				id: processId,
				title: run.workflow_run.head_commit.message,
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
			username: run.sender.login,
			userUrl: run.sender.html_url,
			userImage: run.sender.avatar_url,
			projectImage: run.organization.avatar_url,
			sourceUrl: run.repository.html_url,
			processes,
			time: new Date().toUTCString(),
		};
	}
}

export default new GitHubRunParser();
