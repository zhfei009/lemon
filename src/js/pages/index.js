define(['mui', 'util', 'picker'], (mui, util) => {
	var picker = null;
	var dtPicker= null;
	var sTime = document.querySelector('.select-time')

	function init() {
		// 年月选择框 
		now = {
			y: new Date().getFullYear(), // 系统时间
			m: util.addZero(new Date().getMonth() + 1)
		};

		// 初始化mui
		mui.init();
		// 区域滚动初始化
		scroller('.bill-scroll');
		//初始化popPicker组件
		picker = new mui.PopPicker();
		//给picker对象添加数据
		picker.setData([{
				value: 'm',
				text: '月'
			},
			{
				value: 'y',
				text: '年'
			}
		]);
		// 初始化年月框的默认时间：系统时间
		sTime.innerHTML = now.y + '-' + now.m;

		// 初始化DtPicker组件
		dtPicker = new mui.DtPicker({
			type: 'month'
		});

	}
	// 区域滚动初始化
	function scroller(elName) {
		mui(elName).scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
	}
	// 绑定事件
	function bindEvent() {
		var sType = document.querySelector('.select-type'); // 月
		sType.addEventListener('tap', function() {
			// 显示picker
			picker.show(function(sItem) {
				sType.innerHTML = sItem[0].text;
				console.log(sItem[0].text); //年
				console.log(sItem[0].value); //zz 
			})
		})
		// 点年月
		sTime.addEventListener('tap', function() {
			dtPicker.show(function(selectItems) {
				console.log(selectItems.y); //{text: "2016",value: 2016} 
				console.log(selectItems.m); //{text: "05",value: "05"} 
			})
		})
	}


	// 调用初始化
	init();
	bindEvent();
})
