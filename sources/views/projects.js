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
						{ id:"AutoCat", value:"AutoCat", icon:"mdi mdi-cat" },
						{ id:"CompuHope", value:"CompuHope", icon:"mdi mdi-compass" },
						{ id:"Cubebeat", value:"Cubebeat", icon:"mdi mdi-cube-send" }
					]
				},
				{ $subview:TasksView }
			]
		};
	}
}