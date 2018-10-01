import {JetView} from "webix-jet";

export default class TimeView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			type:"clean",
			rows:[
				{ template:_("Hours spent, %"), type:"header", css:"webix_header chart_header" },
				{
					localId:"hours",
					view:"chart",
					type:"donut",
					value:"#hours#",
					color:"#color#",
					innerRadius:56,
					shadow:0,
					lineColor:obj => obj.color,
					tooltip:{
						template:"#hours#"
					},
					legend:{
						width:100,
						align:"right",
						valign:"middle",
						template:obj => _(obj.activity),
						marker:{
							type:"round", width:7, height:8
						}
					},
					padding:{
						top:10, bottom:20
					}
				}
			]
		};
	}
	init(){
		this.on(this.app,"person:select",person => {
			this.$$("hours").parse(webix.copy(person.hours));
		});
	}
}
