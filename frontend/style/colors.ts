export const stateColor = {
	error: '#e57064',
	warning: '#f8c147',
	info: '#82c0fc',
	success: '#8ac159',
};

export const stateDarkColor = {
	error: '#d25245',
	warning: '#d9a32c',
	info: '#60a9ef',
	success: '#69a633',
};

export const stateLightColor = {
	error: '#fae1de',
	warning: '#fdf6e5',
	info: '#e4f1fd',
	success: '#eefce2',
};

export const textColor = '#333';
export const textMutedColor = '#999';

export const opacity = (color: string, opacity: number) => {
	const opacityHex = Math.round(opacity * 255).toString(16);

	return `${color}${opacityHex}`;
};
