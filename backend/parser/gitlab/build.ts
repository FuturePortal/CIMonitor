import Slugify from 'backend/parser/slug';
import StatusManager from 'backend/status/manager';
import { GitLabBuild } from 'types/gitlab';
import Status, { Process, Stage, Step, StepState } from 'types/status';

import { statusToStepState } from './helper';

class GitLabBuildParser {
    parse(id: string, build: GitLabBuild): Status | null {
        if (build.build_status === 'created') {
            return null;
        }

        const status = this.getStatus(id, build);

        const processes: Process[] = status.processes || [];

        const processId = `pipeline-${build.pipeline_id}`;

        if (!processes.find((process) => process.id === processId)) {
            processes.push({
                id: processId,
                title: build.commit.message.split('\n\n')[0],
                state: 'info',
                stages: [],
                time: new Date().toUTCString(),
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
            time: new Date().toUTCString(),
        };
    }

    getStatus(id: string, build: GitLabBuild): Status {
        let status = StatusManager.getStatus(id);

        if (!status) {
            status = {
                id,
                project: build.project_name,
                state: 'info',
                source: 'gitlab',
                processes: [],
                time: new Date().toUTCString(),
            };

            if (build.tag) {
                status.tag = build.tag;
            }

            if (build.ref) {
                status.branch = build.ref;
            }
        }

        status.userImage = build.user.avatar_url;
        status.source_url = build.repository.homepage;

        return status;
    }

    patchProcess(process: Process, build: GitLabBuild): Process {
        let stages: Stage[] = process.stages;

        const stageId = Slugify(build.build_stage);

        if (!stages.find((stage) => stage.id === stageId)) {
            stages.push({
                id: stageId,
                title: build.build_stage,
                state: 'created',
                steps: [],
                time: new Date().toUTCString(),
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
        };
    }

    patchStage(stage: Stage, build: GitLabBuild): Stage {
        let steps: Step[] = stage.steps;

        const stepId = Slugify(build.build_name);

        if (!steps.find((step) => step.id === stepId)) {
            steps.push({
                id: stepId,
                title: build.build_name,
                state: 'created',
                time: new Date().toUTCString(),
            });
        }

        steps = steps.map((step) => {
            if (step.id === stepId) {
                step.state = statusToStepState(build.build_status, build.build_allow_failure);
                step.time = new Date().toUTCString();
            }

            return step;
        });

        return {
            ...stage,
            steps,
            state: this.determineStageState(steps),
            time: new Date().toUTCString(),
        };
    }

    determineStageState(steps: Step[]): StepState {
        if (steps.find((step) => ['failed'].includes(step.state))) {
            return 'failed';
        }

        if (steps.find((step) => ['running'].includes(step.state))) {
            return 'running';
        }

        if (steps.find((step) => ['created', 'pending'].includes(step.state))) {
            return 'pending';
        }

        return 'success';
    }
}

export default new GitLabBuildParser();
