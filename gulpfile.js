var gulp = require('gulp'),
	server = require('gulp-webserver'),
	sass = require('gulp-sass');
	

// 启服务
gulp.task("startServer",function () {
	return gulp.src('src')
	.pipe(server({
		port:9090,
		proxies:[
			{
				'source':'/users/api/addUser',
				'target':'http://localhost:3000/users/api/addUser'
			}
		]
	}))
})
// 编译MSAssertion
gulp.task('sass',function () {
	return gulp.src('./src/scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./src/css'))
})
// 监听sass
gulp.task('watching',function () {
	return gulp.watch('./src/scss/*.scss',gulp.series('sass'));
})

// 管理开发任务
gulp.task('dev',gulp.series('sass','startServer','watching'));