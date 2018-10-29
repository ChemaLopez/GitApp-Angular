(function() {

    var gulp = require('gulp');
    var plugins = require('gulp-load-plugins')();
    var del = require('del');
    var fs = require('fs');
    var path = require('path');
    var glob = require('glob');
    var runSequence = require('run-sequence');


var paths ={
        scripts:[
            "./build/requires.js",
            "./build/my-app-templates.js",
            "./app/app-module.js",
            "./app/app-routes.js" ,
            "./app/components/**/*.js",
            
        ],
        styles: ['./node_modules/bootstrap/dist/css/bootstrap.css','./app/**/*.css', "./assets/**/*.css" ],
        index: './index.html',
        partials: ['./app/**/*.html', '!app/index.html'],
        images: ['./app/**/*.{png,gif,jpg}'],
        modules:'./app/components/',
        build:'./build/',
        dependencies: './node_module/**'

}

// TASKS
gulp.task('miniCss',miniCss)
gulp.task('miniHtml', miniHtml);
gulp.task('miniJs',miniJs )
gulp.task("dependencies", dependencies);

function dependencies() {  
 var json = JSON.parse(fs.readFileSync('./package.json'));
    var baseDir = './node_modules/';
    var file, keyJson, str, aux, i;
    var includesFiles =[];
    var finalDirs = [];
    for(key in json.dependencies){
        dir =baseDir +key+'/**/package.json';
        file=glob.sync(dir);
        keyJson=JSON.parse(fs.readFileSync(path.resolve(file[0])))
        dir = baseDir+key+'/'+keyJson.main;
        if(dir.includes(".js")){
            str =fs.readFileSync(dir, 'utf-8');
            includesFiles=str.match(/^require\({1}.*[a-z].*/g);
            if(includesFiles!=null){
                for(i=0; i< includesFiles.length;++i){
                    includesFiles[i]= includesFiles[i].replace("require('.", '');
                    includesFiles[i]= includesFiles[i].replace(/'.*/, '');
                   dir = baseDir+key+includesFiles[i]+'.js';
                }
            }
        }else{
            dir+='.js'
        }
        
        finalDirs.push(dir);
    }  
    return gulp.src(finalDirs)
    .pipe(plugins.concat('requires.js'))
    .pipe(gulp.dest(paths.build));
  };

function miniJs(){
    return gulp.src(paths.scripts)
    .pipe(plugins.concat('scripts.js'))
    .pipe(plugins.minify())
    .pipe(gulp.dest(paths.build));

}

function miniCss(){
    return gulp.src(paths.styles)
                .pipe(plugins.concat('style.css'))
                .pipe(plugins.minify())
                .pipe(gulp.dest(paths.build));
}

function miniHtml(){
    return gulp.src(paths.partials)
    .pipe(plugins.flatten())
    .pipe(plugins.dedupe())
    .pipe(plugins.angularTemplatecache({
            standalone: true,
            module:'my-app-templates',
            filename: 'my-app-templates.js',
            root: 'my-app/templates'
                                    }))
    .pipe(gulp.dest(paths.build));

}

gulp.task('images', function(){
return gulp.src(paths.images).pipe(plugins.flatten()).pipe(gulp.dest('./build/assets'))
})
gulp.task('index', function(){
    return gulp.src(paths.index).pipe(plugins.flatten()).pipe(gulp.dest('./build/'))
    })

gulp.task('build-clean', function() {
    // Return the Promise from del()
    return del([paths.build]);
//  ^^^^^^
//   This is the key here, to make sure asynchronous tasks are done!
});


gulp.task('build', function(callback) {
    runSequence('build-clean',
                ['images','index','miniHtml', 'miniCss', 'dependencies'],
                'miniJs',
                callback);
  });


})();

