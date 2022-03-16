const fileSystem = require('fs');
const mix = require('laravel-mix');

const packageFile = `${__dirname}/package.json`;
const currentVersion = JSON.parse(fileSystem.readFileSync(packageFile)).version;

mix.js('front-end/dashboard.js', 'dashboard');

mix.sass('front-end/sass/dashboard.sass', 'dashboard');

mix.options({
    extractVueStyles: true,
    globalVueStyles: `./front-end/sass/globals.sass`,
    // uglify: {
    //     uglifyOptions: {
    //         compress: {
    //             drop_console: mix.inProduction(),
    //         },
    //     },
    // },
});

mix.copy('front-end/static/', 'dashboard/');

if (!mix.inProduction()) {
    mix.webpackConfig({ devtool: `inline-source-map` });

    mix.browserSync({
        proxy: `localhost:9999`,
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
        { key: 'version', value: currentVersion },
    ];

    fileSystem.readFile('front-end/index.html', 'utf8', (error, data) => {
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
