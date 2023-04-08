// karma.conf.js
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    plugin: ['karma-jasmine', 'karma-chrome-launcher', 'karma-jasmine-html-reporter', 'karma-coverage'],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      // dir: require('path').join(__dirname, './coverage/gWorks.webui'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    files: ['./custom-matcher.js', '*.js', '*.spec.js'],
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true


    // reporters: ['progress', 'kjhtml'],
    //...
  });
};
