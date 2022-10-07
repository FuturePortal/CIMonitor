import { State } from 'types/status';

export type GpioModule = {
	type: 'gpio';
	pin: number;
	mode: 'on' | 'off' | 'on-for' | 'off-for';
	duration?: number;
};

export type HttpModule = {
	type: 'http';
	url: string;
};

export type ModuleConfig = GpioModule | HttpModule;

export type ModuleTrigger = {
	event: string;
	status: {
		state: State;
		[key: string]: string;
	};
};

export type ModuleEvent = {
	name: string;
	modules: ModuleConfig[];
};

export type ModuleSettings = {
	triggers: ModuleTrigger[];
	events: ModuleEvent[];
};
