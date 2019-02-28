require.config({
	baseUrl:'/js/',
	paths:{
		'mui':'libs/mui.min',
		'index':'pages/index',
		'picker':'libs/mui.picker.min',
		'echarts':'https://cdn.bootcss.com/echarts/4.2.1-rc1/echarts'
	},
	shim:{
		'picker':{
			deps:['mui'] // 设置依赖  
		}
	}
})