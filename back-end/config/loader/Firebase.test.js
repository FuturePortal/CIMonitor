let mockConfig;
let FirebaseStorage;
let FirebaseConfigLoader;

const invalidObjects = [['undefined', undefined], ['null', null], ['a test string', 'test'], ['an empty array', []]];
const invalidArrays = [['undefined', undefined], ['null', null], ['a test string', 'test'], ['an object', {}]];

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

test.each(invalidObjects)('An error is thrown if the config is %s', async (description, invalidObject) => {
    FirebaseConfigLoader.loadConfigFromFirebase = jest.fn().mockReturnValue(invalidObject);

    await FirebaseConfigLoader.loadConfig();
    FirebaseConfigLoader.getConfig();

    expect(console.error).toHaveBeenCalledWith('[Config] Unable to load config. Error: Loaded config is not an object');
    expect(process.exit).toHaveBeenCalledWith(1);
});

test.each(invalidArrays)(
    'Triggers config is converted to an empty array if it is %s',
    async (description, invalidArray) => {
        mockConfig.triggers = invalidArray;

        FirebaseConfigLoader.loadConfigFromFirebase = jest.fn().mockReturnValue(mockConfig);

        await FirebaseConfigLoader.loadConfig();
        FirebaseConfigLoader.getConfig();

        expect(console.error).not.toHaveBeenCalled();
        expect(process.exit).not.toHaveBeenCalled();
        expect(mockConfig.triggers).toEqual([]);
    }
);

test.each(invalidArrays)(
    'Events config is converted to an empty array if it is %s',
    async (description, invalidArray) => {
        mockConfig.events = invalidArray;

        FirebaseConfigLoader.loadConfigFromFirebase = jest.fn().mockReturnValue(mockConfig);

        await FirebaseConfigLoader.loadConfig();
        FirebaseConfigLoader.getConfig();

        expect(console.error).not.toHaveBeenCalled();
        expect(process.exit).not.toHaveBeenCalled();
        expect(mockConfig.events).toEqual([]);
    }
);

test.each(invalidArrays)(
    'Modules config is converted to an empty array if it is %s',
    async (description, invalidArray) => {
        mockConfig.modules = invalidArray;

        FirebaseConfigLoader.loadConfigFromFirebase = jest.fn().mockReturnValue(mockConfig);

        await FirebaseConfigLoader.loadConfig();
        FirebaseConfigLoader.getConfig();

        expect(console.error).not.toHaveBeenCalled();
        expect(process.exit).not.toHaveBeenCalled();
        expect(mockConfig.modules).toEqual([]);
    }
);

test.each(invalidObjects)('An error is thrown if moduleClient config is %s', async (description, invalidObject) => {
    mockConfig.moduleClient = invalidObject;

    FirebaseConfigLoader.loadConfigFromFirebase = jest.fn().mockReturnValue(mockConfig);

    await FirebaseConfigLoader.loadConfig();
    FirebaseConfigLoader.getConfig();

    expect(console.error).toHaveBeenCalledWith(
        '[Config] Unable to load config. Error: Loaded config section invalid: moduleClient'
    );
    expect(process.exit).toHaveBeenCalledWith(1);
});

test('The Config object is valid if the data is correct', async () => {
    FirebaseStorage.load = jest.fn().mockReturnValue(
        new Promise(resolve => {
            resolve(mockConfig);
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
