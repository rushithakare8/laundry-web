const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const header = require('gulp-header');
const changed = require('gulp-changed');
const banner = require('../configs/banner');
const paths = require('../configs/paths.json');

module.exports = {
  scripts() {
    return gulp.src(paths.js.src)
    .pipe(changed(paths.js.src))
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(header(banner))
    .pipe(gulp.dest(paths.js.dest));
  },
  devscripts() {
    return gulp.src(paths.js.src)
    .pipe(changed(paths.js.src))
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest(paths.js.dest));
  },
};
