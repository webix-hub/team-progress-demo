import {JetView} from "webix-jet";
import {projects} from "models/projects";

export default class CompareView extends JetView {
	config(){
		return {
			type:"clean", rows:[
				{ template:"Total tasks by projects", type:"header" },
				{
					localId:"chart",
					view:"chart",
					type:"barH",
					radius:0,
					barWidth:20,
					yAxis:{
						template:"#project#", lines:false, color:"#EDEFF0"
					},
					xAxis:{
						start:0, step:15, end:90, color:"#fff", lineColor:"#EDEFF0"
					},
					legend:{
						values:[
							{ text:"2017",color:"#8664C6" },
							{ text:"2018",color:"#1CA1C1" }
						],
						valign:"bottom", align:"right", layout:"x",
						margin:1, padding:9,
						marker:{
							type:"round", width:8, height:9
						}
					},
					series:[
						{
							value:"#tasks17#",
							color:"#8664C6",
							tooltip:{
								template:"#tasks17#"
							}
						},
						{
							value:"#tasks18#",
							color:"#1CA1C1",
							tooltip:{
								template:"#tasks18#"
							}
						}
					],
					padding:{ left:100, top:5 }
				}
			]
		};
	}
	init(){
		this.$$("chart").parse(projects);
	}
}
