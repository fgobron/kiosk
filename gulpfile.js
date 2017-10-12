var gulp = require('gulp');
var del = require('del');
var vulcanize = require('gulp-vulcanize');

var globs = {  
  BASE:[
    'manifest.json',
    'appconfig.json',
    'kiosks.json',    
    'service-worker.js',
    'libs/**/*',
    'data/**/*',
    'fonts/**/*',
    'images/**/*'
  ],
  BOWER: [
    "bower_components/webcomponentsjs/webcomponents-lite.min.js",
    "bower_components/promise-polyfill/Promise.js",
    "bower_components/intl-messageformat/dist/intl-messageformat.min.js",
    "bower_components/moment/min/moment.min.js",
    "bower_components/moment/locale/fr.js",
    "bower_components/moment/locale/de.js",
    "bower_components/moment/locale/nl.js"
  ],
  DEST: 'build/default'
};

// Launch mocks service
gulp.task('mocks', function() {
  var exec = require('child_process').exec;
  console.log('Mocks service launching');
  var child = exec('node ./node_modules/@pvcp/planet-mocks/index.js');
  child.stdout.on('data', function(data) {
    console.log('Mocks: ' + data);
  });
  child.stderr.on('data', function(data) {
    console.log('Mocks: ' + data);
  });
  child.on('close', function(code) {
    console.log('Mocks closing code: ' + code);
  });
});

// Polymer serve
gulp.task('serve', function() {
  var exec = require('child_process').exec;
  console.log('Polymer server launching');
  var child = exec('polymer serve');
  child.stdout.on('data', function(data) {
    console.log(data);
  });
  child.stderr.on('data', function(data) {
    console.log(data);
  });
  child.on('close', function(code) {
    console.log('Polymer server closing code: ' + code);
  });
});

// Clean
gulp.task('clean', function() {  
  return del.sync(globs.DEST);
});

// Base structure
gulp.task('base', function() {
  return gulp.src(globs.BASE, {base: "."})
    .pipe(gulp.dest(globs.DEST));
});

// Bower components dependencies
gulp.task('bower', function() {
  return gulp.src(globs.BOWER, {base: "."})
    .pipe(gulp.dest(globs.DEST));
});

// Vulcanize
gulp.task('vulcanize', function() {
  return gulp.src('index.html')
    .pipe(vulcanize())
    .pipe(gulp.dest(globs.DEST));
});

/**
 * Tasks 
 */
gulp.task('default', ['serve']);
gulp.task('dev', ['mocks', 'default']);
gulp.task('build', ['clean', 'base', 'bower', 'vulcanize']);