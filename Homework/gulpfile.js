var gulp = require('gulp');
var base64 = require('gulp-base64');
var clean = require('gulp-clean');
var cleanCss = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
var inject = require('gulp-inject');


gulp.task('default', ['files:copy', 'css:build', 'index']);

gulp.task('index', function () {
    var target = gulp.src('./private/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./public/**/*.js', './public/**/*.css'], {read: false});

    return target
        .pipe(inject(sources,
            {
                addPrefix: '..'
            }))
        .pipe(gulp.dest('./public'));
});

gulp.task('files:copy', ['copy-fonts', 'copy-pictures']);

gulp.task('copy-index', function() {
    return gulp.src('private/index.html')
        .pipe(gulp.dest('public'));
});

gulp.task('copy-fonts', function() {
    return gulp.src('private/css/fonts/*.*')
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('copy-pictures', function() {
    return gulp.src('private/pictures/*.*')
        .pipe(gulp.dest('public/pictures'));
});

gulp.task('css:build', ['clean-css', 'concat-css']);

gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean({force: true}));
});

gulp.task('clean-css', function() {
    return gulp.src('private/css/**/*.css')
        .pipe(base64({
            extensions: ['png'],
            maxImageSize: 4*1024*1024
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist'));
});

gulp.task('concat-css', function() {
    return gulp.src(['dist/reset.css', 'dist/common.css', 'dist/**/*.css'])
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest('public/css'));
});
