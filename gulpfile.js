var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var runSequence = require('run-sequence');

var files = {
  scripts: [
    './src/app/scripts/**/*.js',
    './test/**/*.js',
    './gulpfile.js'
  ]
};

function executeNodeCommand(cmd) {
  var platform = require('os').platform();

  if (platform === 'win32') {
    cmd = 'node ' + cmd;
  }

  return plugins.shell.task(cmd);
}

gulp.task('lint', function() {
  return 
    gulp
      .src(files.scripts)
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function() {
  return 
    gulp
      .src(files.scripts)
      .pipe(plugins.jscs());
});

gulp.task('sass', function () {
  gulp.src('./src/app/styles/**/*.scss')
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.sass())
  .pipe(plugins.sourcemaps.write())
  .pipe(gulp.dest('./src/app/styles'));
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
  require('del')(['build', 'coverage'], callback);
});

gulp.task('run', executeNodeCommand(
  'node_modules/node-webkit-builder/bin/nwbuild --run ./src'
));

gulp.task('build-node-webkit-package', ['clean'], executeNodeCommand(
  'node_modules/node-webkit-builder/bin/nwbuild ./src'
));

gulp.task('watch', function() {
  gulp.watch('./src/app/scripts/**/*.js', ['lint', 'jscs']);
  gulp.watch('./test/spec/**/*.js', ['lint', 'jscs', 'test']);
  gulp.watch('./src/app/styles/**/*.scss', ['sass']);
});

gulp.task('build', function(callback) {
  runSequence(
    'clean', 'restore-node-dependencies', 'restore-bower-dependencies',[
      'lint',      
      'jscs',
      'test',
      'sass'
    ], callback);
});

gulp.task('package', function(callback) {
  runSequence('build', [
      'build-node-webkit-package'
    ], callback);
});

gulp.task('dev', [
  'default',
  'run'
]);

gulp.task('default', [
  'lint',
  'jscs',
  'test',
  'sass',
  'watch'
]);
