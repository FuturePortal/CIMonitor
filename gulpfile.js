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
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(jsFiles)
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format());
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        //.pipe(eslint.failAfterError());
});

gulp.task('default', ['server:start', 'eslint'], function() {
    gulp.watch(serverFiles, ['server:restart']);
    gulp.watch(jsFiles, ['eslint']);
});
