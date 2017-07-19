/*global -$ */
'use strict';

var gulp = require('gulp');
var ejs = require("gulp-ejs");
var $ = require('gulp-load-plugins')();
var browserSync =require('browser-sync');
var del = require('del');
var runSequence = require('run-sequence');

var timetable = require("./app/_data/timetable.json");
var handson = require("./app/_data/handons.json");
var platinumSponsors = require("./app/_data/platinum-sponsors.json");
var goldSponsors = require("./app/_data/gold-sponsors.json");
var silverSponsors = require("./app/_data/silver-sponsors.json");
var bronzeSponsors = require("./app/_data/bronze-sponsors.json");
var jobs = require("./app/_data/jobs.json");
var scalaStaff = require("./app/_data/scala-staff.json");
var networkStaff = require("./app/_data/network-staff.json");
var studentStaff = require("./app/_data/student-staff.json");

gulp.task("ejs", function() {
  gulp.src("./app/index.ejs")
  	.pipe(ejs({
      timetable: timetable,
      handson: handson,
      sponsors: {
        platinum: platinumSponsors,
        gold: goldSponsors,
        silver: silverSponsors,
        bronze: bronzeSponsors
      },
      staff: {
        scala: scalaStaff,
        network: networkStaff,
        student: studentStaff
      },
      jobs: jobs
    }, {"ext": ".html"}))
  	.pipe(gulp.dest("./dist"));

  gulp.src("./app/jobs.ejs")
  	.pipe(ejs({ jobs: jobs }, {"ext": ".html"}))
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
    './app/*.ejs',
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
