import Status from 'types/status';
import { GitLabBuild } from 'types/gitlab';

class GitLabParser {
    getInternalId(): string {
        return 'test';
    }

    parseBuild(build: GitLabBuild): Status {
        console.log('[parser/gitlab] Parsing build...');
        const id = this.getInternalId();

        return {
            id,
            key: '', // the fuck is this?
            project: build.project_name,
            state: 'info',
            time: new Date(),
            source: 'gitlab',
        };
    }
}

export default new GitLabParser();
