import Status from 'types/status';
import { GitLabBuild } from 'types/gitlab';

class GitLabParser {
    parseBuild(build: GitLabBuild): Status {
        console.log('[parser/gitlab] Parsing build...');

        return {
            id: build.ref,
            key: '',
            project: '',
            state: 'info',
            time: new Date(),
        };
    }
}

export default new GitLabParser();
