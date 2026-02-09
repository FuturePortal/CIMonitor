import CIMonitorAPI from '/frontend/api/cimonitor';

export const deleteAllStatuses = () => CIMonitorAPI.delete('status/all');

export const deleteStatus = (statusId: string) => CIMonitorAPI.delete(`status/${statusId}`);
