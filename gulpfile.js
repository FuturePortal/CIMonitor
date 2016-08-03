var gulp = require('gulp');
var server = require('gulp-develop-server');
var bs = require('browser-sync');
var eslint = require('gulp-eslint');

var options = {
    server: {
        path: './app/server.js',
        execArgv: ['--harmony']
    },
    bs: {
        proxy: 'http://localhost:3000'
    }
};

var serverFiles = [
    './app/**/*.js',
    './public/index.html'
];

var jsFiles = [
    './app/**/*.js'
];

gulp.task('server:start', function() {
    server.listen(options.server, function(error) {
        if(!error) bs(options.bs);
    });
});

// If server scripts change, restart the server and then browser-reload.
gulp.task('server:restart', function() {
    server.restart(function(error) {
        if(!error) bs.reload();
    });
});

gulp.task('eslint', function () {
    return gulp.src(jsFiles)
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('eslint-fail-on-error', function () {
    return gulp.src(jsFiles)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('default', ['server:start', 'eslint'], function() {
    gulp.watch(serverFiles, ['server:restart']);
    gulp.watch(jsFiles, ['eslint']);
});
