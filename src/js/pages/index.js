define(['mui', 'util', 'echarts', 'picker'], (mui, util, echarts) => {
	// console.log(echarts)
	var picker = null; // picker单组件
	var dtPicker = null; // picker日期组件
	var sTime = document.querySelector('.select-time'); // 年月选择框
	var timeStatus = true;
	var now = { // 系统时间
		y: new Date().getFullYear(), // 系统时间
		m: util.addZero(new Date().getMonth() + 1)
	};

	function init() {
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
		// 阻止侧滑切换侧边栏
		document.querySelector('.mui-inner-wrap').addEventListener('drag', function(event) {
			event.stopPropagation();
		});
		// 初始化年月框的默认时间：系统时间
		sTime.innerHTML = now.y + '-' + now.m;

		// 初始化DtPicker日期组件
		dtPicker = new mui.DtPicker({
			type: 'month',
			endDate: new Date(now.y, now.m - 1), //设置结束日期 
		});
		// 账单图表tab切换
		tab();
		// 创建图表
		creatChart();
	}
	// 创建图表
	function creatChart() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('echartWrap'));

		// 指定图表的配置项和数据
		option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			series: [{
					name: '访问来源',
					type: 'pie',
					selectedMode: 'single',
					radius: [0, '30%'],

					label: {
						normal: {
							position: 'inner'
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data: [{
							value: 335,
							name: '直达'
						},
						// {value:679, name:'营销广告'},
						// {value:1548, name:'搜索引擎'}
					]
				},
				{
					name: '访问来源',
					type: 'pie',
					radius: ['40%', '55%'],
					label: {
						normal: {
							formatter: '{ {b|{b}：}{c}  {per|{d}%}  ',
							rich: {
								b: {
									fontSize: 16,
									lineHeight: 33
								},
								per: {
									padding: [2, 4],
									borderRadius: 2
								}
							}
						}
					},
					data: [{
							value: 1048,
							name: '百度'
						},
						{
							value: 251,
							name: '谷歌'
						},
						{
							value: 147,
							name: '必应'
						},
						{
							value: 102,
							name: '其他'
						}
					]
				}
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
	}
	//  账单图表tab切换
	function tab() {
		var nav = [...document.querySelectorAll('.tab-nav>span')], // 所有菜单
			cons = [...document.querySelectorAll('.con-content>section')]; //所有内容块
		var idx = 0;
		nav.forEach(function(item, i) {
			item.addEventListener('tap', function() {
				nav[idx].className = '';
				cons[idx].style.display = 'none';
				idx = i; //切换选中项的索引
				nav[idx].className = 'active';
				cons[idx].style.display = 'block';
			})
		})
	}
	// 区域滚动初始化
	function scroller(elName) {
		mui(elName).scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
	}
	// 年月日期的切换（年月两列还是年单列）
	function changeDate(n, w) {
		document.querySelector('.mui-picker[data-id="picker-m"]').style.display = n;
		document.querySelector('h5[data-id="title-m"]').style.display = n;
		document.querySelector('.mui-picker[data-id="picker-y"]').style.width = w;
		document.querySelector('h5[data-id="title-y"]').style.width = w
	}
	//	绑定事件
	function bindEvent() {
		var sType = document.querySelector('.select-type'); // 月
		var showAside = document.querySelector('.show-aside'); // 筛选按钮
		var hideAside = document.querySelector('.hide-aside'); //确定筛选条件按钮
		// console.log(hideAside)
		// 点月选择框 
		sType.addEventListener('tap', function() {
			// 显示picker
			picker.show(function(sItem) {
				sType.innerHTML = sItem[0].text;
				if (sItem[0].value === 'm') { // 如果选中的是月：dtPicker年月两列
					changeDate('inline-block', '50%');
					sTime.innerHTML = now.y + '-' + now.m;
				} else { // 选中的是年：只有年一列
					changeDate('none', '100%');
					sTime.innerHTML = now.y;
				};
				timeStatus = !timeStatus;
			})
		})
		// 点年月选择框
		sTime.addEventListener('tap', function() {
			dtPicker.show(function(sItems) {
				sTime.innerHTML = timeStatus ? sItems.y.text + '-' + sItems.m.text : sItems.y.text;
			})
		})
		// 点筛选按钮，显示侧边栏
		showAside.addEventListener('tap', function() {
			mui('.mui-off-canvas-wrap').offCanvas('show');
		});
		// 点筛选条件确定按钮，隐藏侧边栏
		hideAside.addEventListener('tap', function() {
			mui('.mui-off-canvas-wrap').offCanvas('close');
		});
	}


	// 调用初始化
	init();
	bindEvent();
})
