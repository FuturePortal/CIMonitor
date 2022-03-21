import { getBranch, getTag } from 'backend/parser/github/helper';
import Slugify from 'backend/parser/slug';
import { GitHubPush, GitHubWorkflowJob, GitHubWorkflowRun } from 'types/github';
import Status from 'types/status';

import GitHubJobParser from './job';
import GitHubPushParser from './push';
import GitHubRunParser from './run';

class GitLabParser {
    getInternalId(projectId: number, repositoryName: string, branch: string | null, tag: string | null): string {
        let id = `github-${projectId}-${Slugify(repositoryName)}`;

        if (branch) {
            id += `-${Slugify(branch)}`;
        }

        if (tag) {
            id += `-${Slugify(tag)}`;
        }

        return id;
    }

    parsePush(push: GitHubPush): Status {
        console.log('[parser/github] Parsing push...');

        const id = this.getInternalId(push.repository.id, push.repository.name, getBranch(push.ref), getTag(push.ref));

        return GitHubPushParser.parsePush(id, push);
    }

    parseWorkflowRun(run: GitHubWorkflowRun): Status {
        console.log('[parser/github] Parsing workflow run...');

        const id = this.getInternalId(run.repository.id, run.repository.name, run.workflow_run.head_branch, null);

        return GitHubRunParser.parseRun(id, run);
    }

    parseWorkflowJob(job: GitHubWorkflowJob): Status | null {
        console.log('[parser/github] Parsing workflow job...');

        return GitHubJobParser.parseJob(job);
    }
}

export default new GitLabParser();
