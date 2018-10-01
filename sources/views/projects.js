import {JetView} from "webix-jet";
import TasksView from "views/tasks";

export default class ProjectsView extends JetView {
	config(){
		return {
			cols:[
				{
					view:"sidebar",
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
}