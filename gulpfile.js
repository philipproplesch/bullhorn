var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var os = require('os');

gulp.task('sass', function () {
  gulp.src('./src/public/styles/**/*.scss')
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.sass())
  .pipe(plugins.sourcemaps.write())
  .pipe(gulp.dest('./src/public/styles'));
});

gulp.task('watch', function() {
  gulp.watch('./src/public/styles/**/*.scss', ['sass']);
});

gulp.task('run', plugins.shell.task(
  os.platform() === 'win32' ?
    'node node_modules/node-webkit-builder/bin/nwbuild --run ./src' :
    'node_modules/node-webkit-builder/bin/nwbuild --run ./src'
));

gulp.task('build-win', plugins.shell.task(
  os.platform() === 'win32' ?
    'node node_modules/node-webkit-builder/bin/nwbuild -p win ./src' :
    'node_modules/node-webkit-builder/bin/nwbuild -p win ./src'
));

gulp.task('build-osx', plugins.shell.task(
  os.platform() === 'win32' ?
    'node node_modules/node-webkit-builder/bin/nwbuild -p osx ./src' :
    'node_modules/node-webkit-builder/bin/nwbuild -p osx ./src'
));
