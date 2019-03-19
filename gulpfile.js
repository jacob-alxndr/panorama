var gulp = require('gulp')
var sass = require('gulp-sass')
var cleanCss = require('gulp-clean-css')
var sourceMaps = require('gulp-sourcemaps')
var browserSync = require('browser-sync').create()
var imageMin = require('gulp-imagemin')
var ghPages = require('gh-pages')

sass.compiler = require('node-sass')

gulp.task('sass', function () {
      // we want to run "sass css/app.scss css/app.css --watch"
      return gulp.src("src/scss/main.scss")
            .pipe(sourceMaps.init())
            .pipe(sass())
            .pipe(
                  cleanCss({
                        compatibility: 'ie8' 
                  })
            )
            .pipe(sourceMaps.write())
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.stream())

})

gulp.task("html", function () {

      return gulp.src("src/*.html")
      .pipe(gulp.dest("dist"))

})

gulp.task("fonts", function () {
      
      return gulp.src("src/assets/fonts/*")
      .pipe(gulp.dest("dist/assets/fonts"))
})

gulp.task("img", function () {
      
      return gulp.src("src/assets/img/*")
      .pipe(imageMin())
      .pipe(gulp.dest("dist/assets/img"))
})



gulp.task("watch", function () {

      browserSync.init({
            server: {
                  baseDir:"dist"
            }

      })

      gulp.watch("src/*.html", ["html"]).on("change",browserSync.reload)
      gulp.watch("src/scss/*/*.scss", ["sass"])
      gulp.watch("src/assets/fonts/*", ["fonts"])
      gulp.watch("src/assets/img/*", ["img"])
})

gulp.task("deploy", function(){
      ghPages.publish('dist');
})

gulp.task('default', ["html", "sass", "fonts", "img", "watch"])