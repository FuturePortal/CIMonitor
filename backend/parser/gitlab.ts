import Status, { Process, Stage, State, Step, StepState } from 'types/status';
import { GitLabBuild } from 'types/gitlab';
import Slugify from './slug';
import StatusManager from 'backend/status/manager';

class GitLabParser {
    getInternalId(projectId: number, repositoryName: string, branch: string | false, tag: string | false): string {
        let id = `gitlab-${projectId}-${Slugify(repositoryName)}`;

        if (branch) {
            id += `-${Slugify(branch)}`;
        }

        if (tag) {
            id += `-${Slugify(tag)}`;
        }

        return id;
    }

    parseBuild(build: GitLabBuild): Status {
        console.log('[parser/gitlab] Parsing build...');

        const status = this.getBuildStatus(build);

        return this.patchBuild(status, build);
    }

    getBuildStatus(build: GitLabBuild): Status {
        const id = this.getInternalId(build.project_id, build.repository.name, build.ref, build.tag);

        const status = StatusManager.getStatus(id);

        if (status) {
            return status;
        }

        return {
            id,
            project: build.project_name,
            state: 'info',
            source: 'gitlab',
            tag: build.tag ? build.tag : undefined,
            branch: build.ref ? build.ref : undefined,
            time: new Date(),
        };
    }

    patchBuild(status: Status, build: GitLabBuild): Status {
        const processes: Process[] = status.processes || [];

        const processId = `pipeline-${build.pipeline_id}`;

        if (!processes.find((process) => process.id === processId)) {
            processes.push({
                id: processId,
                title: build.commit.message.split('\n\n')[0],
                state: 'info',
                stages: [],
                time: new Date(),
            });
        }

        return {
            ...status,
            processes: processes.map((process) => {
                if (process.id === processId) {
                    return this.patchProcess(process, build);
                }

                return process;
            }),
            time: new Date(),
        };
    }

    patchProcess(process: Process, build: GitLabBuild): Process {
        let stages: Stage[] = process.stages;

        const stageId = Slugify(build.build_stage);

        if (!stages.find((stage) => stage.id === stageId)) {
            stages.push({
                id: stageId,
                title: build.build_stage,
                state: 'info',
                steps: [],
                time: new Date(),
            });
        }

        stages = stages.map((stage) => {
            if (stage.id === stageId) {
                return this.patchStage(stage, build);
            }

            return stage;
        });

        return {
            ...process,
            stages,
            state: this.determineProcessState(stages),
            time: new Date(),
        };
    }

    determineProcessState(stages: Stage[]): State {
        if (stages.find((stage) => stage.state === 'error')) {
            return 'error';
        }

        if (stages.find((stage) => stage.state === 'warning')) {
            return 'warning';
        }

        if (stages.find((stage) => stage.state === 'info')) {
            return 'info';
        }

        return 'success';
    }

    patchStage(stage: Stage, build: GitLabBuild): Stage {
        let steps: Step[] = stage.steps;

        const stepId = Slugify(build.build_name);

        if (!steps.find((step) => step.id === stepId)) {
            steps.push({
                id: stepId,
                title: build.build_name,
                state: 'created',
                time: new Date(),
            });
        }

        steps = steps.map((step) => {
            if (step.id === stepId) {
                step.state = this.parseBuildStatus(build.build_status, build.build_allow_failure);
                step.time = new Date();
            }

            return step;
        });

        return {
            ...stage,
            steps,
            state: this.determineStageState(steps),
            time: new Date(),
        };
    }

    determineStageState(steps: Step[]): State {
        if (steps.find((step) => step.state === 'failed')) {
            return 'error';
        }

        if (steps.find((step) => ['running', 'pending'].includes(step.state))) {
            return 'warning';
        }

        if (steps.find((step) => step.state === 'created')) {
            return 'info';
        }

        return 'success';
    }

    parseBuildStatus(status: string, allowFailure: boolean): StepState {
        switch (status) {
            case 'failed':
                return allowFailure ? 'soft-failed' : 'failed';
            case 'success':
                return 'success';
            case 'running':
                return 'running';
            case 'pending':
                return 'pending';
            default:
                return 'created';
        }
    }
}

export default new GitLabParser();
