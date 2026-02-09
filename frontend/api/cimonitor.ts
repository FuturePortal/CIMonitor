import store from '/frontend/store';
import { getPassword } from '/frontend/store/settings/selectors';

export { validatePassword } from './cimonitor/auth';
export { deleteAllStatuses, deleteStatus } from './cimonitor/status';

const CIMonitorAPI = () => {
	const request = async (url: string, method: string, body?: unknown) => {
		const password = getPassword(store.getState());

		const response = await fetch(`/${url}`, {
			method,
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				...(password ? { authorization: password } : {}),
			},
			...(body ? { body: JSON.stringify(body) } : {}),
		});

		return response.json();
	};

	return {
		get: (url: string) => request(url, 'GET'),
		post: (url: string, body?: unknown) => request(url, 'POST', body),
		delete: (url: string) => request(url, 'DELETE'),
	};
};

const CIMonitorApiSingleton = CIMonitorAPI();

export default CIMonitorApiSingleton;
