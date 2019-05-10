let mockConfig;
let FirebaseStorage;
let FirebaseConfigLoader;

beforeAll(() => {
    process.env['FIREBASE_URL'] = 'test.firebaseio.com';
    process.env['FIREBASE_PRIVATE_KEY_FILE'] = 'tests/_data/firebase-private-key-file.json';
});

beforeEach(() => {
    jest.resetModules();
    jest.mock('../../storage/Firebase');

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

    FirebaseStorage = require('../../storage/Firebase');
    FirebaseConfigLoader = require('../../config/loader/Firebase');
});

test('An error is thrown if the data is not a valid object', async () => {
    FirebaseConfigLoader.loadConfigFromFirebase = jest.fn().mockReturnValue('test');

    await FirebaseConfigLoader.loadConfig();
    FirebaseConfigLoader.getConfig();

    expect(console.error).toHaveBeenCalledWith('[Config] Unable to load config. Error: Loaded config is not an object');
    expect(process.exit).toHaveBeenCalledWith(1);
});

test('An error is thrown if the data has invalid triggers', async () => {
    mockConfig.triggers = undefined;

    FirebaseConfigLoader.loadConfigFromFirebase = jest.fn().mockReturnValue(mockConfig);

    await FirebaseConfigLoader.loadConfig();
    FirebaseConfigLoader.getConfig();

    expect(console.error).toHaveBeenCalledWith(
        '[Config] Unable to load config. Error: Loaded config section invalid: triggers'
    );
    expect(process.exit).toHaveBeenCalledWith(1);
});

test('An error is thrown if the data has invalid events', async () => {
    mockConfig.events = new Object();

    FirebaseConfigLoader.loadConfigFromFirebase = jest.fn().mockReturnValue(mockConfig);

    await FirebaseConfigLoader.loadConfig();
    FirebaseConfigLoader.getConfig();

    expect(console.error).toHaveBeenCalledWith(
        '[Config] Unable to load config. Error: Loaded config section invalid: events'
    );
    expect(process.exit).toHaveBeenCalledWith(1);
});

test('An error is thrown if the data has invalid modules', async () => {
    mockConfig.modules = 'test';

    FirebaseConfigLoader.loadConfigFromFirebase = jest.fn().mockReturnValue(mockConfig);

    await FirebaseConfigLoader.loadConfig();
    FirebaseConfigLoader.getConfig();

    expect(console.error).toHaveBeenCalledWith(
        '[Config] Unable to load config. Error: Loaded config section invalid: modules'
    );
    expect(process.exit).toHaveBeenCalledWith(1);
});

test('An error is thrown if the data has invalid server config', async () => {
    mockConfig.server = [];

    FirebaseConfigLoader.loadConfigFromFirebase = jest.fn().mockReturnValue(mockConfig);

    await FirebaseConfigLoader.loadConfig();
    FirebaseConfigLoader.getConfig();

    expect(console.error).toHaveBeenCalledWith(
        '[Config] Unable to load config. Error: Loaded config section invalid: server'
    );
    expect(process.exit).toHaveBeenCalledWith(1);
});

test('An error is thrown if the data has invalid moduleClient config', async () => {
    mockConfig.moduleClient = [];

    FirebaseConfigLoader.loadConfigFromFirebase = jest.fn().mockReturnValue(mockConfig);

    await FirebaseConfigLoader.loadConfig();
    FirebaseConfigLoader.getConfig();

    expect(console.error).toHaveBeenCalledWith(
        '[Config] Unable to load config. Error: Loaded config section invalid: moduleClient'
    );
    expect(process.exit).toHaveBeenCalledWith(1);
});

test('The Config object is valid if the data is correct', async () => {
    let mockObject = {
        toJSON: jest.fn(() => {
            console.log('returning the mock config');
            console.log(mockConfig);
            return mockConfig;
        }),
    };

    FirebaseStorage.load = jest.fn().mockReturnValue(
        new Promise(resolve => {
            resolve(mockObject);
        })
    );

    await FirebaseConfigLoader.loadConfig();
    const config = FirebaseConfigLoader.getConfig();

    expect(console.error).not.toHaveBeenCalled();
    expect(process.exit).not.toHaveBeenCalled();

    // Check on instanceof does not work, see https://github.com/facebook/jest/issues/2549
    expect(config.constructor.name).toBe('Config');
    expect(config.triggers).toEqual([]);
    expect(config.events).toEqual([]);
    expect(config.modules).toEqual([]);
    expect(config.server).toEqual({});
    expect(config.moduleClient).toEqual({});
});
