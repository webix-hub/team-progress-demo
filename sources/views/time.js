import {JetView} from "webix-jet";

export default class TimeDonut extends JetView {
	config(){
		return {
			view:"chart",
			type:"donut",
			value:"#sales#",
			color:"#color#",
			innerRadius:65,
			shadow:0,
			legend:{
				width: 75,
				align:"right",
				valign:"middle",
				template:"#month#"
			},
			data:[
				{ sales:"20", month:"Call", color: "#8664C6" },
				{ sales:"30", month:"Mail", color: "#1CA1C1" },
				{ sales:"50", month:"Meeting", color: "#FDBF4C" },
				{ sales:"40", month:"Proposal", color: "#F8643F" }
			]
		};
	}
}
