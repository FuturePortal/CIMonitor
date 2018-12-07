const fileSystem = require('fs');
const mix = require('laravel-mix');

const VersionChecker = require('./server/domain/cimonitor/VersionChecker');

mix.js('client/dashboard.js', 'dashboard');

mix.sass('client/sass/dashboard.sass', 'dashboard');

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

mix.copy('client/static/', 'dashboard/');

if (!mix.inProduction()) {
    mix.webpackConfig({ devtool: `inline-source-map` });

    const Config = require('./server/config/Config');
    mix.browserSync({
        proxy: `localhost:${Config.getServerPort()}`,
        injectChanges: false,
        files: [`dashboard/**/*`],
    });

    mix.disableSuccessNotifications();
}

mix.version();

mix.setPublicPath(`dashboard/`);

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

        fileSystem.writeFile('dashboard/index.html', data, error => {
            if (error) {
                console.error('Could not save the new index.', error);
                return;
            }

            console.log('Index successfully updated and busted.');
        });
    });
});
