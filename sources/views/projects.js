import {JetView} from "webix-jet";
import TasksView from "views/tasks";

export default class ProjectsView extends JetView {
	config(){
		const theme = this.app.config.theme;
		return {
			type:"space", padding:{ left:0 },
			cols:[
				{
					view:"sidebar", css:theme,
					localId:"side:menu",
					width:200,
					on:{
						onAfterSelect:id => this.app.callEvent("tasks:filter",[id])
					},
					data:[
						{ id:"all", value:"All tasks", icon:"mdi mdi-file-tree" },
						{ id:"Support", value:"Support", icon:"mdi mdi-lifebuoy" },
						{ id:"Failure Testing", value:"Failure Testing", icon:"mdi mdi-monitor-cellphone-star" },
						{ id:"Quality Management", value:"Quality Management", icon:"mdi mdi-quality-high" },
						{ id:"Data Quality", value:"Data Quality", icon:"mdi mdi-database-check" }
					]
				},
				{ $subview:TasksView }
			]
		};
	}
	ready(){
		this.on(this.app,"tasks:loaded",() => this.$$("side:menu").select("all"));
	}
}