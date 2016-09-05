/* eslint import/no-extraneous-dependencies: "off" */
const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const header = require('gulp-header');
const changed = require('gulp-changed');
const filesize = require('gulp-filesize');
const minifyCss = require('gulp-cssnano');
const atomicss = require('gulp-atomizer');
const bourbon = require('node-bourbon');
const banner = require('../configs/banner');
const paths = require('../configs/paths.json');

const sassOptions = {
  style: 'compressed',
  includePaths: bourbon.includePaths,
};

module.exports = {
  styles() {
    return gulp.src(paths.css.src)
    .pipe(changed(paths.css.src))
    .pipe(sass(sassOptions))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyCss())
    .pipe(header(banner))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(filesize());
  },
  devstyles() {
    return gulp.src(paths.css.src)
    .pipe(changed(paths.css.src))
    .pipe(sass(sassOptions))
    .pipe(gulp.dest(paths.css.dest));
  },
  atomic() {
    return gulp.src(paths.acss.src)
    .pipe(atomicss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyCss())
    .pipe(header(banner))
    .pipe(gulp.dest(paths.acss.dest))
    .pipe(filesize());
  },
  devatomic() {
    return gulp.src(paths.acss.src)
    .pipe(atomicss())
    .pipe(gulp.dest(paths.acss.dest));
  },
};
