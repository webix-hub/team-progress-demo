import {JetView} from "webix-jet";
import {getStats} from "models/statistics";

export default class StatisticsView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
		return {
			type:"clean", rows:[
				{ template:_("Total tasks completed"), type:"header" },
				{
					localId:"stats",
					view:"chart",
					type:"scatter",
					xValue:"#week#",
					padding:{
						top:4, bottom:44
					},
					xAxis:{
						start:0, end:53, step:2, lines:false, color:"#EDEFF0"
					},
					yAxis:{
						start:0, step:25, end:100, color:"#fff", lineColor:"#EDEFF0"
					},
					legend:{
						values:[
							{ text:"2017", color:"#8664C6" },
							{ text:"2018", color:"#1CA1C1" }
						],
						align:"right", layout:"x", valign:"bottom",
						margin:4, padding:10,
						marker:{
							type:"round", width:8, height:9
						}
					},
					series:[
						{
							value:"#tasks17#",
							disableLines:false,
							item:{
								borderColor:"#1CA1C1", borderWidth:2,
								radius:4
							},
							line:{ color:"#1CA1C1", width:2 },
							tooltip:{
								template:_("Week") + " #week#<br>#tasks17# "
									+ _("tasks completed")
							}
						},
						{
							value:"#tasks18#",
							item:{
								borderColor:"#8664C6", borderWidth:2, radius:4
							},
							line:{ color:"#8664C6", width:2 },
							tooltip:{
								template:_("Week") + " #week#<br>#tasks18# "
								+ _("tasks completed")
							}
						}
					]
				}
			]
		};
	}
	init(){
		this.$$("stats").parse(getStats());
	}
}
