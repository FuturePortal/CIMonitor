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
