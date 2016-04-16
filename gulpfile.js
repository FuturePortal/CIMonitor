var gulp = require('gulp');
var server = require('gulp-develop-server');
var bs = require('browser-sync');

var options = {
    server: {
        path: './server.js',
        execArgv: ['--harmony']
    },
    bs: {
        proxy: 'http://localhost:3000'
    }
};

var serverFiles = [
    './server.js',
    './app/**/*.js',
    './public/index.html'
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

gulp.task('default', ['server:start'], function() {
    gulp.watch(serverFiles, ['server:restart']);
});
