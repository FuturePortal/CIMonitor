import CIMonitorApi from '/frontend/api/cimonitor';

export const deleteAllStatuses = () => CIMonitorApi().delete('status/all');

export const deleteStatus = (statusId: string) => CIMonitorApi().delete(`status/${statusId}`);
