import Slugify from 'backend/parser/slug';
import { GitHubPush, GitHubWorkflowJob, GitHubWorkflowRun } from 'types/github';
import Status from 'types/status';

import GitHubJobParser from './job';
import GitHubPushParser from './push';
import GitHubRunParser from './run';

class GitLabParser {
    getInternalId(projectId: number, repositoryName: string, uniqueElement: string): string {
        const base = `github-${projectId}-${Slugify(repositoryName)}`;

        return `${base}-${Slugify(uniqueElement.replace('refs/tags/', '').replace('refs/heads/', ''))}`;
    }

    parsePush(push: GitHubPush): Status {
        console.log('[parser/github] Parsing push...');

        const id = this.getInternalId(push.repository.id, push.repository.name, push.ref);

        return GitHubPushParser.parsePush(id, push);
    }

    parseWorkflowRun(run: GitHubWorkflowRun): Status {
        console.log('[parser/github] Parsing workflow run...');

        const id = this.getInternalId(run.repository.id, run.repository.name, run.workflow_run.head_branch);

        return GitHubRunParser.parseRun(id, run);
    }

    parseWorkflowJob(job: GitHubWorkflowJob): Status | null {
        console.log('[parser/github] Parsing workflow job...');

        return GitHubJobParser.parseJob(job);
    }
}

export default new GitLabParser();
