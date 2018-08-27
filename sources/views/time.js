import {JetView} from "webix-jet";
import {hours} from "models/time";

export default class TimeDonut extends JetView {
	config(){
		return {
			type:"clean", rows:[
				{ template:"Hours spent", type:"header" },
				{
					localId:"hours",
					view:"chart",
					type:"donut",
					value:"#hours#",
					color:"#color#",
					innerRadius:65,
					shadow:0,
					legend:{
						width:100,
						align:"right",
						valign:"top",
						template:"#activity#"
					},
					padding:{
						top:0, bottom:16
					}
				}
			]
		};
	}
	init(){
		this.$$("hours").parse(hours);
	}
}
