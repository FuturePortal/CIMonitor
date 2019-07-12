let mockConfig;
let Config;
let FilesystemConfigLoader;

const invalidObjects = [['undefined', undefined], ['null', null], ['a test string', 'test'], ['an empty array', []]];
const invalidArrays = [['undefined', undefined], ['null', null], ['a test string', 'test'], ['an object', {}]];

beforeEach(() => {
    console.log = jest.fn();
    console.error = jest.fn();
    process.exit = jest.fn();

    mockConfig = {
        triggers: [],
        events: [],
        modules: [],
        server: {},
        moduleClient: {},
    };

    Config = require('../Config');
    FilesystemConfigLoader = require('./Filesystem');
});

test.each(invalidObjects)('An error is thrown if the config is %s', async (description, invalidObject) => {
    FilesystemConfigLoader.loadConfigFromFilesystem = jest.fn().mockReturnValue(invalidObject);

    await FilesystemConfigLoader.loadConfig();

    expect(console.error).toHaveBeenCalledWith('[Config] Unable to load config. Error: Loaded config is not an object');
    expect(process.exit).toHaveBeenCalledWith(1);
});

test.each(invalidArrays)(
    'Triggers config is converted to an empty array if it is %s',
    async (description, invalidArray) => {
        mockConfig.triggers = invalidArray;

        FilesystemConfigLoader.loadConfigFromFilesystem = jest.fn().mockReturnValue(mockConfig);

        await FilesystemConfigLoader.loadConfig();

        expect(console.error).not.toHaveBeenCalled();
        expect(process.exit).not.toHaveBeenCalled();
        expect(mockConfig.triggers).toEqual([]);
    }
);

test.each(invalidArrays)(
    'Events config is converted to an empty array if it is %s',
    async (description, invalidArray) => {
        mockConfig.events = invalidArray;

        FilesystemConfigLoader.loadConfigFromFilesystem = jest.fn().mockReturnValue(mockConfig);

        await FilesystemConfigLoader.loadConfig();

        expect(console.error).not.toHaveBeenCalled();
        expect(process.exit).not.toHaveBeenCalled();
        expect(mockConfig.events).toEqual([]);
    }
);

test.each(invalidArrays)(
    'Modules config is converted to an empty array if it is %s',
    async (description, invalidArray) => {
        mockConfig.modules = invalidArray;

        FilesystemConfigLoader.loadConfigFromFilesystem = jest.fn().mockReturnValue(mockConfig);

        await FilesystemConfigLoader.loadConfig();

        expect(console.error).not.toHaveBeenCalled();
        expect(process.exit).not.toHaveBeenCalled();
        expect(mockConfig.modules).toEqual([]);
    }
);

test('An error is thrown if the data has invalid server config', async () => {
    mockConfig.server = [];

    FilesystemConfigLoader.loadConfigFromFilesystem = jest.fn().mockReturnValue(mockConfig);

    await FilesystemConfigLoader.loadConfig();

    expect(console.error).toHaveBeenCalledWith(
        '[Config] Unable to load config. Error: Loaded config section invalid: server'
    );
    expect(process.exit).toHaveBeenCalledWith(1);
});

test('An error is thrown if the data has invalid moduleClient config', async () => {
    mockConfig.moduleClient = [];

    FilesystemConfigLoader.loadConfigFromFilesystem = jest.fn().mockReturnValue(mockConfig);

    await FilesystemConfigLoader.loadConfig();

    expect(console.error).toHaveBeenCalledWith(
        '[Config] Unable to load config. Error: Loaded config section invalid: moduleClient'
    );
    expect(process.exit).toHaveBeenCalledWith(1);
});

test('The Config object is valid if the data is correct', async () => {
    FilesystemConfigLoader.loadConfigFromFilesystem = jest.fn().mockReturnValue(mockConfig);

    await FilesystemConfigLoader.loadConfig();
    const config = FilesystemConfigLoader.getConfig();

    expect(console.error).not.toHaveBeenCalled();
    expect(process.exit).not.toHaveBeenCalled();

    expect(config).toBeInstanceOf(Config);
    expect(config.triggers).toEqual([]);
    expect(config.events).toEqual([]);
    expect(config.modules).toEqual([]);
    expect(config.server).toEqual({});
    expect(config.moduleClient).toEqual({});
});
