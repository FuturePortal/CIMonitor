import { isOldProcess } from 'backend/status/helper';
import StatusManager from 'backend/status/manager';
import { BitBucketBuildState, BitBucketCommitStatusWebhook } from 'types/bitbucket';
import Status, { Process, State, StepAndStageState } from 'types/status';

class BitBucketBuildParser {
	parse(id: string, build: BitBucketCommitStatusWebhook): Status {
		let status = StatusManager.getStatus(id);

		if (!status) {
			status = {
				id,
				project: `${build.repository.workspace.name} / ${build.repository.name}`,
				state: 'info',
				source: 'bitbucket',
				time: new Date().toUTCString(),
				processes: [],
			};
		}

		let processes: Process[] = status.processes || [];

		const processId = parseInt(build.commit_status.key);

		if (!processes.find((process) => process.id === processId)) {
			if (isOldProcess(status, processId)) {
				return null;
			}

			processes.push({
				id: processId,
				title: build.commit_status.commit.message,
				state: 'warning',
				stages: [],
				time: new Date().toUTCString(),
			});
		}

		processes = processes.map((process) => {
			if (process.id === processId) {
				return this.patchProcess(process, build);
			}

			return process;
		});

		const commitUser = build.commit_status.commit.author.user;
		return {
			...status,
			processes,
			username: commitUser.display_name,
			userUrl: commitUser.links.html.href,
			userImage: commitUser.links.avatar.href,
			projectImage: build.repository.links.avatar.href,
			sourceUrl: build.repository.links.html.href,
			time: new Date().toUTCString(),
		};
	}

	patchProcess(process: Process, build: BitBucketCommitStatusWebhook): Process {
		return {
			...process,
			stages: [
				{
					id: 'build',
					steps: [],
					time: new Date().toUTCString(),
					state: this.getStageState(build.commit_status.state),
					title: build.commit_status.name,
				},
			],
			state: this.getProcessState(build.commit_status.state),
		};
	}

	getProcessState(state: BitBucketBuildState): State {
		if (state === 'SUCCESSFUL') {
			return 'success';
		}

		if (state === 'FAILED') {
			return 'error';
		}

		return 'warning';
	}

	getStageState(state: BitBucketBuildState): StepAndStageState {
		if (state === 'SUCCESSFUL') {
			return 'success';
		}

		if (state === 'FAILED') {
			return 'failed';
		}

		return 'running';
	}
}

export default new BitBucketBuildParser();
