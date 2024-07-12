import Slugify from 'backend/parser/slug';
import { isOldProcess } from 'backend/status/helper';
import StatusManager from 'backend/status/manager';
import ReadTheDocsBuild from 'types/readthedocs';
import Status, { Process, State, StepAndStageState } from 'types/status';

class ReadTheDocsParser {
	parseBuild(build: ReadTheDocsBuild): Status | null {
		console.log('[parser/readthedocs] Parsing build...');

		const statusId = `readthedocs-${build.slug}-${Slugify(build.version)}`;

		let status = StatusManager.getStatus(statusId);

		if (!status) {
			status = {
				id: statusId,
				project: build.name,
				tag: build.version,
				source: 'readthedocs',
				state: 'warning',
				processes: [],
				time: new Date().toUTCString(),
			};
		}

		let processes: Process[] = status.processes || [];

		const processId = parseInt(build.build);

		if (!processes.find((process) => process.id === processId)) {
			if (isOldProcess(status, processId)) {
				return null;
			}

			processes.push({
				id: processId,
				title: `Build ${build.build}`,
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

		return {
			...status,
			processes,
			url: build.docs_url,
			sourceUrl: build.build_url,
			time: new Date().toUTCString(),
		};
	}

	patchProcess(process: Process, build: ReadTheDocsBuild): Process {
		return {
			...process,
			stages: [
				{
					id: 'build',
					steps: [],
					time: new Date().toUTCString(),
					state: this.getStageState(build.event),
					title: 'Building documentation',
				},
			],
			state: this.getProcessState(build.event),
		};
	}

	getProcessState(event: string): State {
		if (event === 'build:passed') {
			return 'success';
		}

		if (event === 'build:failed') {
			return 'error';
		}

		return 'warning';
	}

	getStageState(event: string): StepAndStageState {
		if (event === 'build:passed') {
			return 'success';
		}

		if (event === 'build:failed') {
			return 'failed';
		}

		return 'running';
	}
}

export default new ReadTheDocsParser();
