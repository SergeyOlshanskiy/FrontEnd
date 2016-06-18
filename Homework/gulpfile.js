var gulp = require('gulp');
var base64 = require('gulp-base64');
var clean = require('gulp-clean');
var cleanCss = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
var inject = require('gulp-inject');
var htmlmin = require('gulp-htmlmin');


gulp.task('default', ['files:copy', 'css:build', 'html:build']);

gulp.task('html:build', ['css:build'], function () {
    var target = gulp.src('./src/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./public/**/*.js', './public/**/*.css'], {read: false});

    return target
        .pipe(inject(sources,
            {
                transform: function (filePath) {
                    var correctFilePath = filePath.replace('/public', '');
                    return '<link rel="stylesheet" href="' + correctFilePath + '">';
                }
            }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyURLs: true
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('files:copy', ['copy-fonts', 'copy-pictures'], function () {
    return gulp.src('src/favicon.ico')
        .pipe(gulp.dest('public'));
});

gulp.task('copy-index', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('public'));
});

gulp.task('copy-fonts', function () {
    return gulp.src('src/css/fonts/*.*')
        .pipe(gulp.dest('public/css/fonts'));
});

gulp.task('copy-pictures', function () {
    return gulp.src('src/pictures/*.*')
        .pipe(gulp.dest('public/pictures'));
});

gulp.task('css:build', function () {
    return gulp.src(['src/css/reset.css', 'src/css/common.css', 'src/css/**/*.css'])
        .pipe(base64({
            extensions: ['png'],
            maxImageSize: 4 * 1024 * 1024
        }))
        .pipe(concatCss("style.css"))
        .pipe(cleanCss())
        .pipe(gulp.dest('public/css'));
});

gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean({force: true}));
});
