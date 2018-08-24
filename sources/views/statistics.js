import {JetView} from "webix-jet";
import {stats} from "models/statistics";

export default class StatisticsView extends JetView{
	config(){
		return {
			view:"chart",
			type:"scatter",
			xValue:"#month#",
			xAxis:{
				start:0,
				end:160,
				step:10
			},
			yAxis:{
				start:0,
				step:20,
				end:100
			},
			series:[
				{
					value:"#tasks17#",
					disableLines:false,
					item:{
						borderColor:"#1CA1C1", borderWidth:2,
						radius:4
					},
					line:{ color:"#1CA1C1", width:2 }
				},
				{
					value:"#tasks18#",
					item:{
						borderColor:"#8664C6", borderWidth:2,
						radius:4
					},
					line:{ color:"#8664C6", width:2 }
				}
			]
		};
	}
	init(view){
		view.parse(stats);
	}
}
