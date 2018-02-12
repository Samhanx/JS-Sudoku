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
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('html', () => {
  const html = require('gulp-htmlmin')
  gulp.src('./src/*.html')
    .pipe(html({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
})

gulp.task('default', ['webpack', 'sass', 'html'])

gulp.task('watch', () => {
  gulp.watch('./src/styles/**/*.scss', ['sass'])
  gulp.watch('./src/scripts/**/*.js', ['webpack'])
  gulp.watch('./src/*.html', ['html'])
})