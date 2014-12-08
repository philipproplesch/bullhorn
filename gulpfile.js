var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('sass', function () {
  gulp.src('./src/styles/**/*.scss')
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.sass())
  .pipe(plugins.sourcemaps.write())
  .pipe(gulp.dest('./src/styles'));
});

gulp.task('watch', function() {
  gulp.watch('./src/styles/**/*.scss', ['sass']);
});

gulp.task('run', executeNodeCommand(
  'node_modules/node-webkit-builder/bin/nwbuild --run ./src'
));

gulp.task('clean', function(callback) {
  require('del')(['build'], callback);
});

gulp.task('build', ['clean'], executeNodeCommand(
  'node_modules/node-webkit-builder/bin/nwbuild ./src'
));

function executeNodeCommand(cmd) {
  var platform = require('os').platform();

  if (platform === 'win32') {
    cmd = 'node ' + cmd;
  }

  return plugins.shell.task(cmd);
}
