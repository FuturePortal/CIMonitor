import Status from 'types/status';
import Slugify from 'backend/parser/slug';
import { GitHubPush, GitHubWorkflowRun, GitHubWorkflowJob } from 'types/github';
import GitHubPushParser from './push';
import GitHubRunParser from './run';
import GitHubJobParser from './job';

class GitLabParser {
    getInternalId(projectId: number, repositoryName: string, branch: string | false, tag: string | false): string {
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

        const id = this.getInternalId(
            push.repository.id,
            push.repository.name,
            push.ref.replace('refs/heads/', ''),
            false
        );

        return GitHubPushParser.parsePush(id, push);
    }

    parseWorkflowRun(run: GitHubWorkflowRun): Status {
        console.log('[parser/github] Parsing workflow run...');

        const id = this.getInternalId(run.repository.id, run.repository.name, run.workflow_run.head_branch, false);

        return GitHubRunParser.parseRun(id, run);
    }

    parseWorkflowJob(job: GitHubWorkflowJob): Status | null {
        console.log('[parser/github] Parsing workflow job...');

        return GitHubJobParser.parseJob(job);
    }
}

export default new GitLabParser();
