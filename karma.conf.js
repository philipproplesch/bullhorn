// Karma configuration

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
      // Libraries
      'src/app/bower_components/angular/angular.js',
      'src/app/bower_components/angular-mocks/angular-mocks.js',
      'src/app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'src/app/bower_components/underscore/underscore.js',

      // Tests
      'test/mocks/**/*.js',
      'test/spec/**/*.js',

      // App
      'src/app/scripts/**/*.js',

      // Templates
      'src/app/templates/**/*.html'
    ],


    // list of files to exclude
    exclude: [
      //'src/scripts/node/**/*.*'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/app/templates/**/*.html': ['ng-html2js'],
      'src/app/scripts/!(node)/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'bullhorn-templates'
    }
  });
};
