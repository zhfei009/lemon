require.config({
	baseUrl:'/js/',
	paths:{
		'mui':'libs/mui.min',
		'index':'pages/index',
		'picker':'libs/mui.picker.min',
<<<<<<< HEAD
		'echarts':'https://cdn.bootcss.com/echarts/4.2.1-rc1/echarts'
=======
		'echarts':'https://cdn.bootcss.com/echarts/4.2.1-rc1/echarts.min'
>>>>>>> 1b50d15396b1aaa3a77fed8e563d4ba886964a4e
	},
	shim:{
		'picker':{
			deps:['mui'] // 设置依赖  
		}
	}
})