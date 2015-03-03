var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var runSequence = require('run-sequence');

var files = {
  scripts: [
    './src/app/scripts/**/*.js',
    './test/**/*.js',
    './gulpfile.js'
  ],
  styles: [
    './src/app/styles/**/*.scss'
  ]
};

function executeNodeCommand(cmd) {
  var platform = require('os').platform();

  if (platform === 'win32') {
    cmd = 'node ' + cmd;
  }

  return plugins.shell.task(cmd);
}

gulp.task('clean', function(done) {
  require('del')(['build', 'coverage'], done);
});

gulp.task('sass', function () {
  gulp.src(files.styles)
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.sass())
  .pipe(plugins.sourcemaps.write())
  .pipe(gulp.dest('./src/app/styles'));
});

gulp.task('lint', function() {
  return
    gulp
      .src(files.scripts)
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.jscs());
});

gulp.task('test', function (done) {
  var karma = require('karma').server;

  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('run', executeNodeCommand(
  'node_modules/node-webkit-builder/bin/nwbuild --run ./src'
));

gulp.task('build-node-webkit-package', ['clean'], executeNodeCommand(
  'node_modules/node-webkit-builder/bin/nwbuild ./src'
));

gulp.task('watch', function() {
  gulp.watch(files.scripts, ['lint', 'test']);
  gulp.watch(files.styles, ['sass']);
});

gulp.task('build', function(callback) {
  runSequence(
    'clean',[
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
