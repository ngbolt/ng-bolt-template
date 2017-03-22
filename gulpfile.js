var gulp = require('gulp');
var bump = require('gulp-bump');
var git = require('gulp-git');
var args = require('get-gulp-args')();

var type = args.t;
var pkg = './package.json';

if (!type) {
    console.error('A value for "type" is required. Pass "type" as a command line argument: "-t=<type>"');
} else if (type !== 'major' || type !== 'minor' || type !== 'path' || type !== 'prerelease') {
    console.error('Invalid value for "type". Valid values are "major", "minor", "patch" or "prerelease".');
}

gulp.task('checkout:dev', function(cb){
    git.checkout('development', function(err){
        if (err) {
            throw err;
        }
        cb();
    });
});

gulp.task('bump', ['checkout:dev'], function(){
    return gulp
        .src(pkg)
        .pipe(bump({type: type}))
        .pipe(gulp.dest('./'));
});

gulp.task('commit', ['bump'], function(){
    return gulp
        .src(pkg)
        .pipe(git.commit('up version'));
});

gulp.task('push:dev', ['commit'], function(cb){
    git.push('origin', 'development', function(err){
        if (err) {
            throw err;
        }
        cb();
    });
});

gulp.task('checkout:master', ['push:dev'], function(cb){
    git.checkout('master', function(err){
        if (err) {
            throw err;
        }
        cb();
    });
})

gulp.task('merge', ['checkout:master'], function(cb){
    git.merge('development', function(err){
        if (err) {
            throw err;
        }
        cb();
    });
});

gulp.task('push:master', ['merge'], function(cb){
    git.push('origin', 'master', function(err){
        if(err) {
            throw err;
        }
        cb();
    });
});

gulp.task('release', ['push:master'], function(cb){
    console.log('Successfully released version ' + require(pkg).version + '. Checking out development.');
    git.checkout('development', function(err){
        if (err) {
            throw err;
        }
        cb();
    });
});