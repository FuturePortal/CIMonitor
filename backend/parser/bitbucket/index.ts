import Slugify from 'backend/parser/slug';
import {
	BitBucketChangeWrapper,
	BitBucketCommitStatusWebhook,
	BitBucketPushWebhook,
	BitBucketRepository,
} from 'types/bitbucket';
import Status from 'types/status';

import BitBucketBuildParser from './build';
import BitBucketPushParser from './push';

class BitBucketParser {
	getInternalId(repository: BitBucketRepository, branch: string): string {
		return `bitbucket-${Slugify(repository.full_name)}-${Slugify(branch)}`;
	}

	parsePush(push: BitBucketPushWebhook): Status {
		console.log('[parser/bitbucket] Parsing push...');

		const relevantChange = push.push.changes.find((changes: BitBucketChangeWrapper) => {
			if (changes.new) {
				return changes.new.type === 'branch' || changes.new.type === 'tag';
			}

			return false;
		});

		if (!relevantChange) {
			console.log('[parser/bitbucket] No relevant change of type branch was found. Stopping.');
			throw 'No relevant change was found';
		}

		const id = this.getInternalId(push.repository, relevantChange.new.name);

		return BitBucketPushParser.parse(id, push, relevantChange.new);
	}

	parseBuild(build: BitBucketCommitStatusWebhook): Status {
		console.log('[parser/bitbucket] Parsing build...');

		if (build.commit_status.refname === null) {
			console.log('[parser/bitbucket] Build could not be linked to a branch. Stopping.');
			throw 'Build was not for a branch';
		}

		const id = this.getInternalId(build.repository, build.commit_status.refname);

		return BitBucketBuildParser.parse(id, build);
	}
}

export default new BitBucketParser();
