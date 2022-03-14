import Status from 'types/status';
import { GitLabBuild } from 'types/gitlab';
import Slugify from 'backend/parser/slug';
import GitLabBuildParser from './build';

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

        const id = this.getInternalId(build.project_id, build.repository.name, build.ref, build.tag);

        return GitLabBuildParser.parseBuild(id, build);
    }
}

export default new GitLabParser();
