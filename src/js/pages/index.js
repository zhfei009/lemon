define(['mui', 'picker'], (mui) => {
	var selectType = document.querySelector('.select-type'); // 月选择器
	function init() {
		// 初始化mui
		mui.init();
		//初始化scroll控件
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
		
	}
	//初始化popPicker组件
	function popPicker() {
		var picker = new mui.PopPicker();
		//给picker对象添加数据
		picker.setData([{
			value: 'month',
			text: '月'
		},{
			value: 'year',
			text: '年'
		}]);
		//显示picker
		picker.show(function(item) {
			selectType.innerHTML = item[0].text;
			
		})
	}
	// 绑定事件
		function addEvent() {
			
			// 点击月选择框
			selectType.addEventListener('tap',popPicker);
		}
		
		
	// 调用初始化
	init();
	// 调用绑定事件
	addEvent();
})
