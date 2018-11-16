let mix = require('laravel-mix');

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

if (!mix.inProduction()) {
    mix.webpackConfig({ devtool: `inline-source-map` });
}

mix.version();

mix.browserSync({
    proxy: `localhost:9999`,
    injectChanges: false,
    files: [`dist/**/*`],
});

mix.disableSuccessNotifications();

mix.setPublicPath(`dist/`);
