import Slugify from 'backend/parser/slug';
import { isOldProcess } from 'backend/status/helper';
import StatusManager from 'backend/status/manager';
import { GitLabPipeline } from 'types/gitlab';
import Status, { Process, Stage } from 'types/status';

import { statusToState } from './helper';

class GitLabPipelineParser {
    parse(id: string, pipeline: GitLabPipeline): Status | null {
        const status = this.getStatus(id, pipeline);

        let processes: Process[] = status.processes || [];

        const processId = pipeline.object_attributes.id;

        if (!processes.find((process) => process.id === processId)) {
            if (isOldProcess(status, processId)) {
                return null;
            }

            processes.push({
                id: processId,
                title: pipeline.commit.title,
                state: 'info',
                stages: [],
                time: new Date().toUTCString(),
            });
        }

        processes = processes.map((process) => {
            if (process.id === processId) {
                return this.patchProcess(process, pipeline);
            }

            return process;
        });

        return {
            ...status,
            processes,
            time: new Date().toUTCString(),
        };
    }

    getStatus(id: string, pipeline: GitLabPipeline): Status {
        let status = StatusManager.getStatus(id);

        if (!status) {
            status = {
                id,
                project: `${pipeline.project.namespace} / ${pipeline.project.name}`,
                state: 'info',
                source: 'gitlab',
                time: new Date().toUTCString(),
                processes: [],
            };

            if (pipeline.object_attributes.tag) {
                status.tag = pipeline.object_attributes.tag;
            }

            if (pipeline.object_attributes.ref) {
                status.branch = pipeline.object_attributes.ref;
            }
        }

        status.userImage = pipeline.user.avatar_url;
        status.projectImage = pipeline.project.avatar_url;
        status.source_url = pipeline.project.git_http_url;

        return status;
    }

    patchProcess(process: Process, pipeline: GitLabPipeline): Process {
        let stages: Stage[] = process.stages;
        const pipelineStages = pipeline.object_attributes.stages;

        for (let stage of pipelineStages) {
            const stageId = Slugify(stage);

            if (!stages.find((stage) => stage.id === stageId)) {
                stages.push({
                    id: stageId,
                    title: stage,
                    state: 'pending',
                    steps: [],
                    time: new Date().toUTCString(),
                });
            }
        }

        const state = statusToState(pipeline.object_attributes.status);

        return {
            ...process,
            stages: stages.sort(
                (stageA: Stage, stageB: Stage): number =>
                    pipelineStages.indexOf(stageA.title) - pipelineStages.indexOf(stageB.title)
            ),
            state,
        };
    }
}

export default new GitLabPipelineParser();
