'use strict'

// Подключаем модули
let gulp = require('gulp')
let sync = require('browser-sync').create()
let wrapPipe = require('./modules/wrap-pipe')
let scrPath = require('./src-path/')
let $ = require('gulp-load-plugins')()
let cleanCSS = require('gulp-clean-css')
let watch = require('gulp-watch')

// Синхронизация с браузером
gulp.task('serve', function() {
    sync.init({
        server: "dist"
    });
    // sync.watch('src/**/*.*').on('change', sync.reload);
});

// Собираем Sass UiKit
gulp.task('uikitSass', wrapPipe(function(success, error) {
    return gulp.src(scrPath.uikitSass)
        .pipe($.sass().on('error', error))
        .pipe($.autoprefixer({
            browsers: [
                '> 1%',
                'ie 9',
                'last 2 version'
            ]
        }))
        .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe($.concat('uikit.min.css'))
        .pipe(gulp.dest('dist/css'));
})); 

// Собираем Sass
gulp.task('sass', wrapPipe(function(success, error) {
    return gulp.src(scrPath.sassSrc)
        .pipe($.sass().on('error', error))
        .pipe($.autoprefixer({
            browsers: [
                '> 1%',
                'ie 9',
                'last 2 version'
            ]
        }))
        .pipe($.cssbeautify())
        .pipe($.concat('style.css'))
        .pipe(gulp.dest('dist/css'));
})); 

// Собираем HTML
gulp.task('twig', wrapPipe(function (success, error) {

    let filter = $.filter(['!./src/templates/'], {restore: true});

    return gulp.src(scrPath.twigSrc)
        .pipe($.twig().on('error', error))
        .pipe(gulp.dest('dist/'));
}));

// Собираем картинки
gulp.task('img', function () {
    return gulp.src(scrPath.imgSrc)
        .pipe(gulp.dest('dist/images/'));
});

// Собираем JS
gulp.task('js', function () {
    return gulp.src(scrPath.jsSrc)
        .pipe(gulp.dest('dist/js/'));
});

// Собираем CSS
gulp.task('css', function () {
    return gulp.src(scrPath.cssSrc)
        .pipe(gulp.dest('dist/css/'));
});

// Собираем Шрифты
gulp.task('fonts', function () {
    return gulp.src(scrPath.fontsSrc)
        .pipe(gulp.dest('dist/fonts/'));
});

// Собираем плагины
gulp.task('libs', function () {
    return gulp.src(scrPath.libsSrc)
        .pipe(gulp.dest('dist/libs/'));
});

// Следим за изменениями
gulp.task('watch', function () {
    gulp.watch(scrPath.sassSrc, ['sass'])
    
    gulp.watch(scrPath.uikitSass, ['uikitSass'])

    gulp.watch(scrPath.imgSrc, ['img'])

    gulp.watch(scrPath.fontsSrc, ['fonts'])

    gulp.watch(scrPath.cssSrc, ['css'])

    gulp.watch(scrPath.jsSrc, ['js'])

    gulp.watch(scrPath.twigSrc, ['twig'])
});

// Сборка дистрибутива
gulp.task('build', ['uikitSass', 'sass', 'twig', 'img', 'js', 'css', 'fonts', 'libs'])
gulp.task('dev', ['build', 'watch'])