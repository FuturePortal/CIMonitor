export type GpioModule = {
    type: 'gpio';
    pin: number;
    mode: 'on' | 'off' | 'on-for' | 'off-for';
} & {
    mode: 'on-for' | 'off-for';
    duration: number;
};

export type HttpModule = {
    type: 'http';
    url: string;
};

export type ModuleConfig = GpioModule | HttpModule;

export type ModuleTrigger = {
    event: string;
    status: {
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
