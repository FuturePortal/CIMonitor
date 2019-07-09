const FirebaseConfigParser = require('./FirebaseConfigParser.js');

const expectedConfigs = [
    {
        in: {
            0: 'test',
            1: 'test',
            2: 'test',
        },
        out: ['test', 'test', 'test'],
    },
    {
        in: {
            0: 'test',
            1: 'test',
            2: { test: 'test' },
        },
        out: ['test', 'test', { test: 'test' }],
    },
    {
        in: {
            statuses: {
                0: {
                    key: 'project-1-master',
                },
                1: {
                    key: 'project-1-develop',
                    stages: {
                        0: {
                            stage: 'build',
                            status: 'success',
                        },
                        1: {
                            stage: 'deploy',
                            status: 'success',
                        },
                    },
                },
            },
        },
        out: {
            statuses: [
                {
                    key: 'project-1-master',
                },
                {
                    key: 'project-1-develop',
                    stages: [
                        {
                            stage: 'build',
                            status: 'success',
                        },
                        {
                            stage: 'deploy',
                            status: 'success',
                        },
                    ],
                },
            ],
        },
    },
    {
        in: {
            0: 'test',
            1: 'test',
            3: 'test',
        },
        out: {
            0: 'test',
            1: 'test',
            3: 'test',
        },
    },
];

test('Test should verify that firebase array objects are parsed to native arrays', () => {
    expectedConfigs.forEach(config => {
        expect(FirebaseConfigParser.convertObjectArraysToArrays(config.in)).toEqual(config.out);
    });
});
