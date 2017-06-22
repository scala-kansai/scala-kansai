/*global -$ */
'use strict';

var gulp = require('gulp');
var ejs = require("gulp-ejs");
var $ = require('gulp-load-plugins')();

var timetable = require("./app/data/timetable.json");
var platinumSponsors = require("./app/data/platinum-sponsors.json");
var goldSponsors = require("./app/data/gold-sponsors.json");
var silverSponsors = require("./app/data/silver-sponsors.json");
var bronzeSponsors = require("./app/data/bronze-sponsors.json");
var jobs = require("./app/data/jobs.json");
var scalaStaff = require("./app/data/scala-staff.json");
var networkStaff = require("./app/data/network-staff.json");
var studentStaff = require("./app/data/student-staff.json");

gulp.task("ejs", function() {
  gulp.src("./app/index.ejs")
  	.pipe(ejs({
      timetable: timetable,
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
      }
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

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe($.ghPages({
      remoteUrl: "https://github.com/scalamatsuri-kansai/scalakansai-summit.github.io.git"
    }));
});

gulp.task('default', function() {
  // place code for your default task here
});
