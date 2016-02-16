const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const moment = require('moment');
const autoprefixer = require('autoprefixer');
const postCss = require('gulp-postcss');
const less = require('gulp-less');
const notify = require('gulp-notify');
const liveReload = require('gulp-livereload');
const browserify = require('gulp-browserify');

const onError = function (err) {
    gutil.beep();
    console.log(err);
};

gulp.task('default', ['scripts', 'less']);

gulp.task('scripts', () =>
    gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
);

gulp.task('less', function() {
    gulp.src(['src/less/base.less'])
        .pipe(concat('base'))
        .pipe(less())
        .pipe(postCss([autoprefixer({browsers: ['last 2 versions', 'Explorer 9']})]))
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(gulp.dest('static/css/'))
        .pipe(notify('Compiled less (' + moment().format('MMM Do h:mm:ss A') + ')'))
        .pipe(liveReload({
            auto: false
        }));
});
