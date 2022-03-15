import Status, { Process, Stage, State } from 'types/status';
import { GitLabPipeline } from 'types/gitlab';
import Slugify from 'backend/parser/slug';
import StatusManager from 'backend/status/manager';

class GitLabPipelineParser {
    parsePipeline(id: string, pipeline: GitLabPipeline): Status {
        const status = this.getStatus(id, pipeline);

        let processes: Process[] = status.processes || [];

        const processId = `pipeline-${pipeline.object_attributes.id}`;

        if (!processes.find((process) => process.id === processId)) {
            processes.push({
                id: processId,
                title: pipeline.commit.title,
                state: 'info',
                stages: [],
                time: new Date(),
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
            time: new Date(),
        };
    }

    getStatus(id: string, pipeline: GitLabPipeline): Status {
        let status = StatusManager.getStatus(id);

        if (!status) {
            status = {
                id,
                project: pipeline.project.name,
                state: 'info',
                source: 'gitlab',
                tag: pipeline.object_attributes.tag ? pipeline.object_attributes.tag : undefined,
                branch: pipeline.object_attributes.ref ? pipeline.object_attributes.ref : undefined,
                time: new Date(),
                processes: [],
            };
        }

        status.userImage = pipeline.user.avatar_url;
        status.projectImage = pipeline.project.avatar_url;

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
                    time: new Date(),
                });
            }
        }

        return {
            ...process,
            stages: stages.sort(
                (stageA: Stage, stageB: Stage): number =>
                    pipelineStages.indexOf(stageA.title) - pipelineStages.indexOf(stageB.title)
            ),
            state: this.parsePipelineStatus(pipeline.object_attributes.status),
        };
    }

    parsePipelineStatus(status: string): State {
        const gitlabStatuses = {
            pending: 'warning',
            running: 'warning',
            failed: 'error',
            success: 'success',
        };

        return gitlabStatuses[status] || 'info';
    }
}

export default new GitLabPipelineParser();
