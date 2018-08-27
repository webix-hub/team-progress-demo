import {JetView} from "webix-jet";

export default class ProgressView extends JetView {
	config(){
		return {
			view:"chart",
			gravity:2,
			type:"splineArea",
			value:"#tasks#",
			color:"#36abee",
			alpha:0.6,
			xAxis:{
				template:"#month#"
			},
			yAxis:{
				start:0,
				end:100,
				step:20
			},
			data:[
				{"month":2,"tasks":27},
				{"month":4,"tasks":17},
				{"month":12,"tasks":39},
				{"month":23,"tasks":45},
				{"month":30,"tasks":31},
				{"month":45,"tasks":83},
				{"month":56,"tasks":78},
				{"month":67,"tasks":33},
				{"month":78,"tasks":85},
				{"month":89,"tasks":57},
				{"month":90,"tasks":50},
				{"month":101,"tasks":53,},
				{"month":112,"tasks":78},
				{"month":123,"tasks":43},
				{"month":134,"tasks":38,},
				{"month":145,"tasks":63},
				{"month":156,"tasks":48,},
				{"month":153,"tasks":23},
				{"month":158,"tasks":23},
				{"month":159,"tasks":28}
			]
		};
	}
}
