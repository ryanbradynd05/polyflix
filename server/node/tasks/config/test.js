/**
 * Run mocha and istanbul
 *
 * ---------------------------------------------------------------
 *
 *
 */
module.exports = function(gulp, plugins, growl) {

  gulp.task('test', function() {
    return gulp.src(['api/controllers/**/*.js', 'api/models/**/*.js'])
      .pipe(plugins.istanbul())
      .pipe(plugins.istanbul.hookRequire())
      .on('finish', function() {
        gulp.src(['test/**/*.js'])
          .pipe(plugins.mocha({timeout: 5000}))
          .pipe(plugins.istanbul.writeReports()) // Creating the reports after tests runned
          .pipe(plugins.if(growl, plugins.notify({
            message: 'test task complete'
          })));
      });
  });
};