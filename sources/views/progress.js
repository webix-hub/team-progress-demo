import {JetView} from "webix-jet";

export default class ProgressView extends JetView {
	config(){
		return {
			type:"clean", gravity:2, rows:[
				{ template:"Individual employee's progress", type:"header" },
				{
					view:"chart",
					localId:"progress",
					type:"splineArea",
					value:"#tasks#",
					color:"#1CA1C1",
					alpha:0.1,
					xAxis:{
						template:"#week#",
						title:"Weeks"
					},
					yAxis:{
						start:0,
						end:100,
						step:20,
						title:"Tasks"
					},
					legend:{
						values:[
							{text:"", color:"#1CA1C1"}
						],
						align:"right", layout:"x", valign:"top"
					},
					tooltip:{
						template:"Week #week#<br>#tasks# tasks completed"
					},
					padding:{
						top:16
					}
				}
			]
		};
	}
	init(){
		let chart = this.$$("progress");
		this.on(this.app,"person:select",(name,progress) => {
			chart.parse(progress);
			this.newLegend(name);
		});
	}
	newLegend(name){
		let chart = this.$$("progress");
		chart.define("legend", {
			values:[
				{text:name, color:"#1CA1C1"}
			],
			align:"right", layout:"x", valign:"top"
		});
		chart.refresh();
	}
}
