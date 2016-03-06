var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var path = require('path');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

gulp.task('less', function () {
    return gulp.src('./less/**/*.less')
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(minifyCSS())
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest('./release/public/css'));
});

gulp.task('clean', function(){
  return gulp.src('./release/**/*', {read: false})
		         .pipe(clean({force:true}));
});

gulp.task('copy-to-release', function(){
  gulp.src('./package.json')
     .pipe(gulp.dest('./release'));
  gulp.src('./src/**/*')
      .pipe(gulp.dest('./release'));
});

gulp.task('express', function() {
  require('./release/app.js');
});

gulp.task('compress-js', function() {
  var rootPath = './bower_components/';
  var files = [rootPath+'jquery/dist/jquery.js',
               rootPath+'bootstrap/dist/js/bootstrap.js',
               rootPath+'toastr/toastr.js',
               rootPath+'datatables/media/js/jquery.dataTables.js',
               rootPath+'datatables/media/js/dataTables.bootstrap.js',
               rootPath+'qrcode.js/qrcode.js',
               './libs/modernizr-2.8.3-respond-1.4.2.min.js'];
  gulp.src(files)
             .pipe(concat('libs.js'))
             //.pipe(uglify())
             .pipe(gulp.dest('./release/public/js'));
  gulp.src('./scripts/**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('./release/public/js'));
});

gulp.task('compress-css', function(){
  var rootPath = './bower_components/';
  var files = [rootPath+'bootstrap/dist/css/bootstrap.css',
               rootPath+'bootstrap/dist/css/bootstrap-theme.css',
               rootPath+'toastr/toastr.css',
               rootPath+'datatables/media/css/jquery.dataTables.min.css',
               rootPath+'datatables/media/css/dataTables.bootstrap.css'];
  return gulp.src(files)
             .pipe(concat('libs.css'))
             .pipe(minifyCSS())
             .pipe(gulp.dest('./release/public/css'));
});

gulp.task('move-files', function(){
  var rootPath = './bower_components/';

  //Move bootstrap fonts
  var files = [rootPath+'bootstrap/dist/fonts/*'];
  gulp.src(files)
      .pipe(gulp.dest('./release/public/fonts'));

  files = [rootPath+'datatables/media/images/*'];
  gulp.src(files)
      .pipe(gulp.dest('./release/public/images'));
});

gulp.task('watch', function() {
  gulp.watch('./less/**/*.less', ['less']);
  gulp.watch('./libs/**/*.js', ['compress']);
});

gulp.task('build', ['copy-to-release', 'less', 'compress-js', 'compress-css', 'move-files'], function() {

});

gulp.task('default', ['express', 'watch'], function(){

});
