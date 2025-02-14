import Slugify from 'backend/parser/slug';
import { GitLabBuild, GitLabDeployment, GitLabMergeRequest, GitLabPipeline } from 'types/gitlab';
import Status from 'types/status';

import GitLabBuildParser from './build';
import GitLabDeploymentParser from './deployment';
import GitLabMergeRequestParser from './merge-request';
import GitLabPipelineParser from './pipeline';

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

		const projectId = build.project?.id || build.project_id;
		const id = this.getInternalId(projectId, build.repository.name, build.ref, build.tag);

		return GitLabBuildParser.parse(id, build);
	}

	parsePipeline(pipeline: GitLabPipeline): Status {
		console.log('[parser/gitlab] Parsing pipeline...');

		const id = this.getInternalId(
			pipeline.project.id,
			pipeline.project.name,
			pipeline.object_attributes.ref,
			pipeline.object_attributes.tag
		);

		return GitLabPipelineParser.parse(id, pipeline);
	}

	parseDeployment(deployment: GitLabDeployment): Status {
		console.log('[parser/gitlab] Parsing deployment...');

		const id = this.getInternalId(deployment.project.id, deployment.project.name, deployment.ref, false);

		return GitLabDeploymentParser.parse(id, deployment);
	}

	parseMergeRequest(mergeRequest: GitLabMergeRequest): Status {
		console.log('[parser/gitlab] Parsing merge request...');

		const id = this.getInternalId(
			mergeRequest.project.id,
			mergeRequest.project.name,
			mergeRequest.object_attributes.source_branch,
			false
		);

		return GitLabMergeRequestParser.parse(id, mergeRequest);
	}
}

export default new GitLabParser();
