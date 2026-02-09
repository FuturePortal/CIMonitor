declare module '*.svg' {
	import React = require('react');
	export const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	const src: string;
	export default src;
}

declare module '*.png' {
	const content: string;
	export default content;
}

declare module '*.mp3' {
	const content: string;
	export default content;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
interface Window {
	PASSWORD_PROTECTED: 'dashboard' | 'settings' | 'no';
}
