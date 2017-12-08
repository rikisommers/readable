/**
 *
 *	NV GulpFile
 *
 *	@version	0.1.0
 *	@author		Bren Murrell    [bren.murrell@nvinteractive.com]
 *	            Glen Honeybone  [glen.honeybone@nvinteractive.com]
 *
 */


/** ------------------------------------------------------------
 *	AVAILABLE TASKS
    sass			: Compile SCSS to CSS and add autoprefixing and sourcemapping
    watch           : Runs the 'sass' task above with browser-sync
    serve           : Runs the 'watch' task above
    default         : Runs 'serve' task above
    imagemin        : Run image optimisation to save some valuable kb's
    uncss           : Run this prior to deployment to removed unused CSS rules
 */

/** ------------------------------------------------------------
 *  OPTIONS
 */
var fs              = require('fs');
var del             = require('del');
var gulp            = require('gulp');
var gutil           = require('gulp-util');             // Some extra gulp utils
var gulpcopy        = require('gulp-copy');             // Some extra gulp utils
var sass            = require('gulp-sass');             // Compiles sass
var sourcemaps      = require('gulp-sourcemaps');       // Generates sass sourcemaps
//var imagemin 		= require('gulp-imagemin');			// Optimises images
var autoprefixer    = require('gulp-autoprefixer');     // Adds vendor prefixes to css rules
var uncss           = require('gulp-uncss');            // Scan for unused CSS rules and remove them
var browserSync     = require('browser-sync').create(); // Reloads the browser on file changes

require('es6-promise').polyfill();                      // Adds es6 promises support


/** ------------------------------------------------------------
 *  OPTIONS
 *  Tailor these to your project's needs
 */

// Set up a directories object for easy reference
var dirs = {
    css     : 'src/styles/',
    scss    : 'src/styles/scss/**', // Includes all sub directories
    plugins : 'src/plugins'
};

// Load our plugin manifest
var plugins = JSON.parse(fs.readFileSync('./plugins.json'));

var siteurl = 'http://localhost:3000/';

// Sass Output Settings
var sassConfig = {
    errLogToConsole: false,
    outputStyle: 'nested'  // default: 'nested' to allow minifiying by bundles, or: 'expanded', 'compact', 'compressed'
};

// Autoprefixer config
var apConfig = {
    browsers: ['last 2 versions', '> 5%', 'ie 8-10'],
    cascade: true
};

// BrowserSync Config
var bsConfig = {
    enabled: true,
    proxy: "localhost:3000"
};



/** ------------------------------------------------------------
 *  TASKS
 */

// @task        : default
// @description : Runs the 'watch', copy and 'serve' tasks.
//                Called by simply running 'gulp' from the command line
gulp.task('default', ['copy','watch', 'serve']);


// @task        : sass
// @description : Compiles SCSS to CSS
gulp.task('sass', function(){

    var has_error = ''; // Track errors during compile

	return gulp.src(dirs.scss + '/*.scss') 	// Get all files ending with .scss in app/scss and children dirs
        .pipe(sourcemaps.init())
        .pipe(sass(sassConfig).on('error', function(err){                   // Handle errors gracefully
            has_error = true;                                               // We have an error
            gutil.log( gutil.colors.red(err.message) );                     // Spit out the error
            this.emit('end');                                               // We can't continue so 'jump' to the end
        }))
        .pipe(autoprefixer(apConfig))                                       // Add out autoprefixing
        .pipe(sourcemaps.write())		                                    // Output sourcemaps to a separate file
        .pipe(gulp.dest(dirs.css)) 				                            // Output compiled css to the css folder
        .pipe(browserSync.stream())

        .on('end', function(){                                              // Handle the end event
            if(has_error === '') {                                          // If we don't have an error, compiling was successful
                gutil.log(gutil.colors.green('## CSS compile succeeded'));  // Woohoo!
            }
        });
});


// @task        : watch
// @description : Run the sass task when called, then watch for changes
gulp.task('watch', ['sass'], function(){

    gulp.watch(dirs.scss + '/*.{scss,sass}', ['sass']);               // If any file changes, re-run the sass task

});


// @task        : serve
// @description : Run the 'watch' task, then fire up the browser if we have BrowserSync enabled
gulp.task('serve',  ['watch'], function (){

    if(bsConfig.enabled === true){
        browserSync.init({
            proxy: bsConfig.proxy
        });
        gulp.watch(dirs.views + "/*.cshtml").on('change', browserSync.reload);   // Reload the page when a view file changes
        browserSync.stream();
    }

});


// @task        : copy
// @description : Copy npm-installed plugin files to a public directory
gulp.task('copy',  function (){

    // Clean the plugins directory
    return gulp.src(plugins)
        .pipe(gulpcopy(dirs.plugins, {prefix : 1}))
        .on('end', function(){
            gutil.log(gutil.colors.green('## Plugin files copied'));
        });
});


// @task        : imagemin
// @description : Optimise image compression. Run this prior to deployment.
//                May eventually end up being run automatically as part of a build script.
gulp.task('imagemin', function(){
    return gulp.src(dirs.images + '/*')         // Get all images
        .pipe(imagemin())
        .on('end', function(){
            gutil.log(gutil.colors.green('## Images optimised'));
        });
});



// @task        : uncss
// @description : Removes unused CSS rules. Ensure your site URL is defined in the options section.
//                May eventually end up being run automatically as part of a build script.
gulp.task('uncss', function(){
    return gulp.src(dirs.css + '/*.css')
        .pipe(uncss({
            html: [siteurl]
        }))
        .pipe(gulp.dest(dirs.css))
        .on('end', function(){
            gutil.log(gutil.colors.green('## Unused styles removed'));
        });
});


// @task        : criticalcss
// @description : Inclines critical css in the page head to improve page speed
gulp.task('criticalcss', function(){
    return gutil.log(gutil.colors.dim('## To implement at a later date...'));
});
