import {JetView} from "webix-jet";

export default class CompareView extends JetView {
	config(){
		return {
			view:"chart",
			type:"barH",
			yAxis:{
				template:"'#year#"
			},
			xAxis:{
				start:0,
				step:10,
				end:100
			},
			legend:{
				values:[
					{text:"Type A",color:"#58dccd"},
					{text:"Type B",color:"#a7ee70"}
				],
				valign:"middle",
				align:"right",
				width:90
			},
			series:[
				{
					value:"#sales#",
					color: "#58dccd",
					tooltip:{
						template:"#sales#"
					}
				},
				{
					value:"#sales2#",
					color:"#a7ee70",
					tooltip:{
						template:"#sales2#"
					}
				}
			],
			data:[
				{ sales:"20", sales2:"35", year:"02" },
				{ sales:"40", sales2:"24", year:"03" },
				{ sales:"44", sales2:"20", year:"04" },
				{ sales:"23", sales2:"50", year:"05" }
			]
		};
	}
}
