require.config({
	baseUrl:'/js/',
	paths:{
		'mui':'libs/mui.min',
		'index':'pages/index',
		'picker':'libs/mui.picker.min'
	},
	shim:{
		'picker':{
			deps:['mui'] // 设置依赖  
		}
	}
})