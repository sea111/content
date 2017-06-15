//gulp常用操作
var gulp=require('gulp'),
	less=require('gulp-less'),//less模块
	htmlmin=require('gulp-htmlmin'),//html压缩
	imagemin=require('gulp-imagemin'),//图片压缩
	uglify=require('gulp-uglify'),//js压缩
	jsConcat=require('gulp-concat'),//合并js
	autoprefixer=require('gulp-autoprefixer'),//根据浏览器自动设置前缀
	livereload=require('gulp-livereload'),//监听文件 自动刷新页面
	mincss=require('gulp-minify-css');//压缩css文件
gulp.task('Less',function(){
	//less编译为css并压缩
	gulp.src('src/less/*.less')
		.pipe(less())
		.pipe(mincss({compatibility: 'ie7'}))//兼容ie7
		.pipe(gulp.dest('dist/css'));
})
gulp.task('minHtml',function(){
	//html压缩
	var opts={
		removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
	}
	gulp.src('src/html/*.html')
		.pipe(htmlmin(opts))
		.pipe(gulp.dest('dist/css'));
})
gulp.task('minImg',function(){
	//图片压缩
	var opts={
		optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
	}
	gulp.src('src/img/*.{png,jpg,gif,ico}')
		.pipe(imagemin(opts))
		.pipe(gulp.dest('dist/img'));
})
gulp.task('minJs',function(){
	//js压缩
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
})
gulp.task('concatJs',function(){
	//js合并
	gulp.src('src/js/*.js')
		.pipe(jsConcat('all.js'))//all.js合并后的文件名
		.pipe(gulp.dest('dist/js'));
})
gulp.task('autoFix',function(){
	//根据浏览器自动设置前缀
	var opts={
		browsers:['last 2 versions', 'Android >= 4.0'],
		cascade: true, //是否美化属性值 默认：true
		remove:true //是否去掉不必要的前缀 默认：true 
	}
	gulp.src('src/css/*.css')
		.pipe(autoprefixer(opts))
		.pipe(gulp.dest('dist/css'));
})
// gulp.task('autoLoad',function(){
// 	//监听文件自动刷新
	
// })
