var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var outputPath = './static';

gulp.task('js:libs', function () {

    gulp.src([
        './node_modules/angular/angular.min.js',
        './node_modules/angular-resource/angular-resource.min.js',
        './node_modules/ui-select/dist/select.min.js',
        './node_modules/moment/min/moment-with-locales.min.js'
    ])
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(gulp.dest(outputPath + '/js'));
});

gulp.task('js:build', function () {
    gulp.src([
        './src/**/*.js',
        './src/*.js'
    ])
        .pipe(concat('build.js'))
        .pipe(uglify())
        .pipe(gulp.dest(outputPath + '/js'));
});

gulp.task('css:libs', function () {
    gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/ui-select/dist/select.min.css'
    ])
        .pipe(concat('libs.css'))
        .pipe(gulp.dest(outputPath + '/css'))
});

gulp.task('css:build', function () {
    gulp.src([
        './src/css/*.css'
    ])
        .pipe(concat('build.css'))
        .pipe(gulp.dest(outputPath + '/css'))
});

gulp.task('templates:copy', function () {
    gulp.src([
        './src/templates/*.html'
    ]).pipe(gulp.dest(outputPath + '/templates'));
});

gulp.task('default', ['js:libs', 'js:build', 'templates:copy', 'css:libs', 'css:build'], function () {
    gulp.watch('./src/**/*.js', ['js:build']);
    gulp.watch('./src/css/*.css', ['css:build']);
    gulp.watch('./src/templates/*.html', ['templates:copy']);
});