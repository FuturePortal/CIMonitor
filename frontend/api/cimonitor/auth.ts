import CIMonitorAPI from '/frontend/api/cimonitor';

export const validatePassword = (password: string): Promise<{ valid: boolean; reason: string }> =>
	CIMonitorAPI.post('auth/validate', { password });
