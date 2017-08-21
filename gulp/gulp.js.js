/* eslint import/no-extraneous-dependencies: "off" */
const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const header = require('gulp-header');
const webpack = require('webpack-stream');
const banner = require('../configs/banner');
const paths = require('../configs/paths.json');
const webpackConfig = require('../webpack.config');

module.exports = {
  main() {
    return gulp.src(paths.js.main)
      .pipe(webpack(webpackConfig.homeConfig))
      .pipe(gulp.dest(paths.js.dest))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify({
        mangle: false,
        compress: {
          unused: false,
        },
      }))
      .pipe(header(banner))
      .pipe(gulp.dest(paths.js.dest));
  },
  routes() {
    return gulp.src(paths.js.routes)
      .pipe(webpack(webpackConfig.routesConfig))
      .pipe(gulp.dest(paths.js.dest))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify({
        mangle: false,
        compress: {
          unused: false,
        },
      }))
      .pipe(header(banner))
      .pipe(gulp.dest(paths.js.dest));
  },
};
