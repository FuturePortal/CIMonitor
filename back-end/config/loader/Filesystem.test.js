const FilesystemConfigLoader = require('./Filesystem');
const Config = require('../Config');

let mockConfig;

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
});

test('An error is thrown if the data is not a valid object', async () => {
    FilesystemConfigLoader.loadConfigFromFilesystem = jest.fn().mockReturnValue('test');

    await FilesystemConfigLoader.loadConfig();
    FilesystemConfigLoader.getConfig();

    expect(console.error).toHaveBeenCalledWith('[Config] Unable to load config. Error: Loaded config is not an object');
    expect(process.exit).toHaveBeenCalledWith(1);
});

test('An error is thrown if the data has invalid triggers', async () => {
    mockConfig.triggers = undefined;

    FilesystemConfigLoader.loadConfigFromFilesystem = jest.fn().mockReturnValue(mockConfig);

    await FilesystemConfigLoader.loadConfig();
    FilesystemConfigLoader.getConfig();

    expect(console.error).toHaveBeenCalledWith(
        '[Config] Unable to load config. Error: Loaded config section invalid: triggers'
    );
    expect(process.exit).toHaveBeenCalledWith(1);
});

test('An error is thrown if the data has invalid events', async () => {
    mockConfig.events = new Object();

    FilesystemConfigLoader.loadConfigFromFilesystem = jest.fn().mockReturnValue(mockConfig);

    await FilesystemConfigLoader.loadConfig();
    FilesystemConfigLoader.getConfig();

    expect(console.error).toHaveBeenCalledWith(
        '[Config] Unable to load config. Error: Loaded config section invalid: events'
    );
    expect(process.exit).toHaveBeenCalledWith(1);
});

test('An error is thrown if the data has invalid modules', async () => {
    mockConfig.modules = 'test';

    FilesystemConfigLoader.loadConfigFromFilesystem = jest.fn().mockReturnValue(mockConfig);

    await FilesystemConfigLoader.loadConfig();
    FilesystemConfigLoader.getConfig();

    expect(console.error).toHaveBeenCalledWith(
        '[Config] Unable to load config. Error: Loaded config section invalid: modules'
    );
    expect(process.exit).toHaveBeenCalledWith(1);
});

test('An error is thrown if the data has invalid server config', async () => {
    mockConfig.server = [];

    FilesystemConfigLoader.loadConfigFromFilesystem = jest.fn().mockReturnValue(mockConfig);

    await FilesystemConfigLoader.loadConfig();
    FilesystemConfigLoader.getConfig();

    expect(console.error).toHaveBeenCalledWith(
        '[Config] Unable to load config. Error: Loaded config section invalid: server'
    );
    expect(process.exit).toHaveBeenCalledWith(1);
});

test('An error is thrown if the data has invalid moduleClient config', async () => {
    mockConfig.moduleClient = [];

    FilesystemConfigLoader.loadConfigFromFilesystem = jest.fn().mockReturnValue(mockConfig);

    await FilesystemConfigLoader.loadConfig();
    FilesystemConfigLoader.getConfig();

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
