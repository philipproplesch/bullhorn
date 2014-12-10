var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var runSequence = require('run-sequence');

function executeNodeCommand(cmd) {
  var platform = require('os').platform();

  if (platform === 'win32') {
    cmd = 'node ' + cmd;
  }

  return plugins.shell.task(cmd);
}

gulp.task('lint', function() {
  return gulp.src([
    './src/scripts/**/*.js',
    './test/**/*.js',
    './gulpfile.js'
    ])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function () {
  gulp.src('./src/styles/**/*.scss')
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.sass())
  .pipe(plugins.sourcemaps.write())
  .pipe(gulp.dest('./src/styles'));
});

gulp.task('test', function (done) {
  var karma = require('karma').server;

  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('restore-node-dependencies', plugins.shell.task(
  'npm install', {
    cwd: './src'
  }
));

gulp.task('restore-bower-dependencies', plugins.shell.task(
  'bower install'
));

gulp.task('clean', function(callback) {
  require('del')(['build'], callback);
});

gulp.task('run', executeNodeCommand(
  'node_modules/node-webkit-builder/bin/nwbuild --run ./src'
));

gulp.task('build-node-webkit-package', ['clean'], executeNodeCommand(
  'node_modules/node-webkit-builder/bin/nwbuild ./src'
));

gulp.task('watch', function() {
  gulp.watch('./src/scripts/**/*.js', ['lint']);
  gulp.watch('./src/styles/**/*.scss', ['sass']);
});

gulp.task('build', function(callback) {
  runSequence(
    'restore-node-dependencies', 'restore-bower-dependencies',[
      'lint',
      'test',
      'sass'
    ], callback);
});

gulp.task('package', function(callback) {
  runSequence('build', [
      'build-node-webkit-package'
    ], callback);
});

gulp.task('default', [
  'lint',
  'test',
  'sass',
  'watch'
]);
