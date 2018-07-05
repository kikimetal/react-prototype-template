import path from "path"
import gulp from "gulp"
import plumber from "gulp-plumber"
import del from "del"

// practical commands ----------------------------
// build js & css
gulp.task("default", ["js", "css"])
// watch
gulp.task("watch", ["js", "css"], () => {
  gulp.watch("./src/js/**/*", ["js"])
  gulp.watch("./src/css/**/*", ["css"])
})
// use webpack env:production & css minify
gulp.task("min", ["js:min", "css:min"])
// watch minify
gulp.task("watch:min", ["js:min", "css:min"], () => {
  gulp.watch("./src/js/**/*", ["js:min"])
  gulp.watch("./src/css/**/*", ["css:min"])
})
// php server
gulp.task("server", ["php-built-in-server"])
// -----------------------------------------------

// js build use webpack in gulp
import webpackStream from "webpack-stream"
import webpack from "webpack"
import webpackConfigDev from "./webpack.dev.babel.js"
import webpackConfigProd from "./webpack.prod.babel.js"

const jsOutputPath = path.resolve(__dirname, "public", "assets", "js")

gulp.task("js:clean", () => {
  return del([jsOutputPath])
})

gulp.task("js", ["js:clean"], () => {
  console.log("(gulp) start webpack env:dev")
  return webpackStream(webpackConfigDev, webpack)
    .pipe(gulp.dest(jsOutputPath))
})

gulp.task("js:min", ["js:clean"], () => {
  console.log("(gulp) start webpack env:production")
  return webpackStream(webpackConfigProd, webpack)
    .pipe(gulp.dest(jsOutputPath))
})


// scss bundle
// sourcemaps 参考(https://qiita.com/takuyabe/items/e9f253f672d1df058cd0)
import sass from "gulp-sass"
import concat from "gulp-concat"
import cleancss from "gulp-clean-css"
import autoprefixer from "gulp-autoprefixer"
import sourcemaps from "gulp-sourcemaps"

const scssPath = [
  "!./src/css/test/**/*",
  // "./src/css/common/*.scss",
  "./src/css/common/common.scss",
  "./src/css/*.scss",
  "./src/css/**/*.scss",
]
const cssOutputPath = path.resolve(__dirname, "public", "assets", "css")

gulp.task("css:clean", () => {
  return del([cssOutputPath])
})

gulp.task("css", ["css:clean"], () =>
    gulp.src(scssPath)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: "expanded",
    }).on("error", sass.logError))
    .pipe(concat("bundle.css"))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer({
      browsers: ["last 2 versions"]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cssOutputPath))
)

gulp.task("css:min", ["css:clean"], () =>
    gulp.src(scssPath)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("bundle.css"))
    .pipe(cleancss({debug: true}, (details) => {
      console.log("(gulp) css minify state " + details.name + "[original]: " + details.stats.originalSize)
      console.log("(gulp) css minify state " + details.name + "[minified]: " + details.stats.minifiedSize)
    }))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer({
      browsers: ["last 2 versions"],
      cascade: false,
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cssOutputPath))
)


// run php built-in server && browser hot-reload
// use "gulp server"
import browserSync from "browser-sync"
import php from "gulp-connect-php"
const port = 8888

gulp.task("php-built-in-server", ["browser-sync"], () => {
  gulp.watch("./public/**/*", ["browser-reload"])
})

gulp.task("php", () => {
  return php.server({
    base: "public/",
    port: port,
  })
})

gulp.task("browser-sync", ["php"], () => {
  return browserSync({
    proxy: `localhost:${port}`,
    port: port,
    files: ["public/**/*"],
    // open: "external",
    open: false,
  })
})

gulp.task("browser-reload", () => {
  return browserSync.reload();
})
