const fileSystem = require('fs');
const mix = require('laravel-mix');

const Config = require('./server/config/Config');
const VersionChecker = require('./server/domain/cimonitor/VersionChecker');

mix.js('client/client.js', 'dist');

mix.sass('client/sass/dashboard.sass', 'dist');

mix.options({
    extractVueStyles: true,
    globalVueStyles: `./client/sass/globals.sass`,
    // uglify: {
    //     uglifyOptions: {
    //         compress: {
    //             drop_console: mix.inProduction(),
    //         },
    //     },
    // },
});

mix.copy('client/static/', 'dist/');

if (!mix.inProduction()) {
    mix.webpackConfig({ devtool: `inline-source-map` });

    mix.browserSync({
        proxy: `localhost:${Config.getServerPort()}`,
        injectChanges: false,
        files: [`dist/**/*`],
    });

    mix.disableSuccessNotifications();
}

mix.version();

mix.setPublicPath(`dist/`);

mix.then(() => {
    const replacements = [
        { key: 'bust', value: new Date().getTime() },
        { key: 'version', value: VersionChecker.getCurrentVersion() },
    ];

    fileSystem.readFile('client/index.html', 'utf8', (error, data) => {
        if (error) {
            console.error('Could not load the source index file.', error);
            return;
        }

        for (let index in replacements) {
            data = data.replace(new RegExp(`---${replacements[index].key}---`, 'g'), replacements[index].value);
        }

        fileSystem.writeFile('dist/index.html', data, error => {
            if (error) {
                console.error('Could not save the new index.', error);
                return;
            }

            console.log('Index successfully updated and busted.');
        });
    });
});
