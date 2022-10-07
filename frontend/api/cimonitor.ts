import axios from 'axios';

export { deleteAllStatuses, deleteStatus } from './cimonitor/status';

export const CIMonitorApi = () =>
	axios.create({
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
		},
		baseURL: '/',
	});

export default CIMonitorApi;
