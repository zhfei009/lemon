define(['mui', 'util', 'echarts', 'picker'], (mui, util, echarts) => {	
	var picker = null,
		dtPicker = null,
		sTime = document.querySelector('.select-time'),
		flag = true, // 记录是年还是月，true表示月
		now = {
			y: new Date().getFullYear(), // 系统时间
			m: util.addZero(new Date().getMonth() + 1),
			d: new Date().getDate()
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
			endDate: new Date(now.y, (now.m - 1), now.d), //设置结束日期 
		});
		// 取消滑动显示侧边栏
		document.querySelector('.mui-inner-wrap').addEventListener('drag', function(event) {
			event.stopPropagation();
		});
	}
	// 折叠菜单
	function menu() {
		var menus = [...document.querySelectorAll('.day-wrap>h2')];
		menus.forEach(function(item, i) {
			item.addEventListener('tap', function() {
				var list = this.nextElementSibling;
				list.classList.toggle('hide'); // 切换样式
			})
		})
	}
	// 区域滚动初始化
	function scroller(elName) {
		mui(elName).scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
	}
	// 控制显示年/年月
	function chageYM(n, w) {
		document.querySelector('h5[data-id="title-m"]').style.display = n;
		document.querySelector('.mui-picker[data-id="picker-m"]').style.display = n;
		document.querySelector('h5[data-id="title-y"]').style.width = w;
		document.querySelector('.mui-picker[data-id="picker-y"]').style.width = w;
	}

	// 绑定事件
	function bindEvent() {
		var sType = document.querySelector('.select-type'), // 月
			selectBtn = document.querySelector('.mui-icon-star'), //筛选按钮
			sureBtn = document.querySelector('.sure'); //确定按钮
		sType.addEventListener('tap', function() {
			// 显示picker
			picker.show(function(sItem) {
				sType.innerHTML = sItem[0].text;
				// 如果选择中的是年,点击年月时选择一列年数据
				if (sItem[0].value === 'y') {
					// 只显示年
					chageYM('none', '100%');
					flag = false;
					// 更改年月选择框里显示的内容变年
					sTime.innerHTML = now.y;
				} else {
					flag = true;
					chageYM('inline-block', '50%');
					// 更改年月选择框里显示的内容变月
					sTime.innerHTML = now.y + '-' + now.m;
				}
			})
		})

		// 点年月
		sTime.addEventListener('tap', function() {
			dtPicker.show(function(selectItems) {

				sTime.innerHTML = !flag ? selectItems.y.text : selectItems.y.text + '-' + selectItems.m.text;				
			})
		});
		// 点筛选按钮
		selectBtn.addEventListener('tap', function() {
			mui('.mui-off-canvas-wrap').offCanvas('show');
		});
		sureBtn.addEventListener('tap', () => {
			mui('.mui-off-canvas-wrap').offCanvas('close');
		})
	}
	// 选择项卡
	function tab() {
		var navs = [...document.querySelectorAll('.tab-nav>span')], // 所有的菜单
			cons = [...document.querySelectorAll('.con-content>section')], // 所有的内容盒子
			idx = 0; // 选中项的下标
		navs.forEach(function(item, i) {
			item.addEventListener('tap', function() {
				// 原有的菜单取消class ,内容块隐藏
				navs[idx].className = '';
				cons[idx].style.display = 'none';
				// 更改选中项的下标值
				idx = i;
				// 选择中的菜单添加class ,内容块显示
				navs[idx].className = 'active';
				cons[idx].style.display = 'block';

			});
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
	// 图表
	function chart() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('main'));

		// 指定图表的配置项和数据
		var option = {
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
					}
				},
				{
					name: '访问来源',
					type: 'pie',
					radius: ['40%', '55%'],
					label: {
						normal: {
							formatter: '{b|{b}：}  {per|{d}%}  ',


							rich: {

								b: {
									fontSize: 16,
									lineHeight: 33
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
	// 调用初始化
	init();
	bindEvent();
	tab();
	chart();
	menu();
})
