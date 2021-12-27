const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const autoprefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const minifycss = require('gulp-minify-css');
const rename = require("gulp-rename");
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

const config = {

    server: {

        baseDir: "./build"

    },

    tunnel: false,

    host: 'localhost',

    port: 8080

};

function htmlBuild() {

    return gulp.src('src/html/pages/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('build/'));

}

function imgBuild() {
    return gulp.src('src/img/*')
        .pipe(gulp.dest('build/img/'));
}

function fontsBuild() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('build/fonts/'));
}

function jsBuild() {
    return gulp.src(['src/js/scripts.js'])
        .pipe(concat('all-scripts.js'))
        .pipe(gulp.dest('build/js/'));
}

function cssBuild() {
    return gulp.src('src/scss/*.scss')

        .pipe(sourcemaps.init())

        .pipe(sass().on('error', sass.logError))

        .pipe(autoprefix({

            cascade: false

        }))

        .pipe(minifycss({processImport: false}))

        .pipe(sourcemaps.write())

        .pipe(rename({suffix: '.min'}))

        .pipe(gulp.dest('build/css/'))

        .pipe(browserSync.stream());
};

gulp.task('clearBuild', function() {

    return del(['build/*'])

});

gulp.task('watch', function() {

    browserSync.init(config);

    gulp.watch('src/scss/**/*.scss', gulp.series(cssBuild));

    gulp.watch('src/scss/*.scss', gulp.series(cssBuild));

    gulp.watch('src/js/*.js', gulp.parallel(jsBuild));

    gulp.watch('src/html/components/*.pug',  gulp.parallel(htmlBuild, imgBuild)).on('change', browserSync.reload);

    gulp.watch('src/html/pages/*.pug',  gulp.parallel(htmlBuild, imgBuild)).on('change', browserSync.reload);

});

gulp.task('build',

    gulp.series(
        'clearBuild',
        gulp.parallel(htmlBuild, imgBuild, jsBuild, cssBuild, fontsBuild)
    )

);

gulp.task('default', gulp.series('build', 'watch'));