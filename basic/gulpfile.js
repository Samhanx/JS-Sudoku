const gulp = require('gulp')

gulp.task('webpack', () => {
  const webpack = require('webpack-stream')
  const config = require('./webpack.config.js')

  gulp.src('./src/scripts/**/*.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('./dist/scripts'))
})

gulp.task('sass', () => {
  const sass = require('gulp-sass')
  gulp.src('./src/styles/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('html', () => {
  const html = require('gulp-htmlmin')
  gulp.src('./src/*.html')
    .pipe(html({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
})

gulp.task('default', ['webpack', 'sass', 'html'])