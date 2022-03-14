import Status from 'types/status';
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
        build;

        // TODO: Check if a process already exists

        // TODO: check if a stage already exists

        // TODO: Check if the build already exists

        // TODO: Patch process and stage status based on the new status

        return {
            ...status,
            time: new Date(),
        };
    }
}

export default new GitLabParser();
