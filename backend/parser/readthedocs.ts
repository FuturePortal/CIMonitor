import Slugify from 'backend/parser/slug';
import StatusManager from 'backend/status/manager';
import ReadTheDocsBuild from 'types/readthedocs';
import Status, { Process, State, StepState } from 'types/status';

class ReadTheDocsParser {
    getState(event: string): State {
        if (event === 'build:passed') {
            return 'success';
        }

        if (event === 'build:failed') {
            return 'error';
        }

        return 'warning';
    }

    getStepState(event: string): StepState {
        if (event === 'build:passed') {
            return 'success';
        }

        if (event === 'build:failed') {
            return 'failed';
        }

        return 'running';
    }

    parseBuild(build: ReadTheDocsBuild): Status {
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
                time: new Date(),
            };
        }

        let processes: Process[] = status.processes || [];

        const processId = `build-${build.build}`;

        if (!processes.find((process) => process.id === processId)) {
            processes.push({
                id: processId,
                title: `Build ${build.build}`,
                state: 'warning',
                stages: [],
                time: new Date(),
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
            state: this.determineState(processes),
            time: new Date(),
        };
    }

    determineState(processes: Process[]): State {
        if (processes.find((process) => process.state === 'warning')) {
            return 'warning';
        }

        if (processes.find((process) => process.state === 'error')) {
            return 'error';
        }

        return 'success';
    }

    patchProcess(process: Process, build: ReadTheDocsBuild): Process {
        return {
            ...process,
            stages: [
                {
                    id: 'build',
                    steps: [],
                    time: new Date(),
                    state: this.getStepState(build.event),
                    title: 'Building documentation',
                },
            ],
            state: this.getState(build.event),
        };
    }
}

export default new ReadTheDocsParser();
