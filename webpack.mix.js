let mix = require('laravel-mix');
const Config = require('./server/config/Config');

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
}

mix.version();

mix.browserSync({
    proxy: `localhost:${Config.getServerPort()}`,
    injectChanges: false,
    files: [`dist/**/*`],
});

mix.disableSuccessNotifications();

mix.setPublicPath(`dist/`);
