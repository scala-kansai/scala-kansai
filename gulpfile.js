/*global -$ */
'use strict';

var gulp = require('gulp');
var ejs = require("gulp-ejs");
var $ = require('gulp-load-plugins')();
var browserSync =require('browser-sync');
var del = require('del');
var runSequence = require('run-sequence');

var siteData = require("./app/_data/");

gulp.task("ejs", function() {
  gulp.src("./app/index.ejs")
  	.pipe(ejs(siteData.getAllData(), {"ext": ".html"}))
  	.pipe(gulp.dest("./dist"));

  gulp.src("./app/jobs.ejs")
  	.pipe(ejs({ jobs: siteData.getAllData().jobs }, {"ext": ".html"}))
  	.pipe(gulp.dest("./dist"));
});

gulp.task('sass', function () {
  return gulp.src('./app/_scss/**/*.scss')
    .pipe($.sass({
      outputStyle: 'nested',
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('watch', ['ejs', 'sass', 'copy'], function () {
  gulp.watch(['./app/_scss/**/*.scss'], ['sass']);
  gulp.watch([
    './app/**/*.json',
    './app/*.ejs',
    './app/images/**/*',
    './app/_common/**/*.ejs',
    './app/_contents/**/*.ejs',
  ], ['ejs']);
});

gulp.task('browser-sync', function() {
  browserSync.init(null, {
    server: './dist',
    port: 5000,
    ws: true,
    files: ["./dist/**/*"],
    browser: "google chrome",
  });
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe($.ghPages({
      remoteUrl: "https://github.com/scalamatsuri-kansai/scalakansai-summit.github.io.git"
    }));
});

gulp.task('default', [ 'browser-sync', 'watch'], function() {
  // place code for your default task here
});

gulp.task('copy', function() {
  return gulp.src(
    [
      './app/**',
      '!./app/_*',
      '!./app/_*/**',
      '!./app/*.ejs'
    ],
    { base: 'app' }
  ).pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
  return del(['dist']);
});

gulp.task('build', function(cb) {
  runSequence('clean',
    ['ejs', 'sass', 'copy'],
    cb);
});
