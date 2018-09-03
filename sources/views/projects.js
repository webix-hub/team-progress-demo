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
						{ id:"all", value:"All tasks", icon:"file-tree" },
						{ id:"Support", value:"Support", icon:"lifebuoy" },
						{ id:"AutoCat", value:"AutoCat", icon:"cat" },
						{ id:"CompuHope", value:"CompuHope", icon:"compass" },
						{ id:"Cubebeat", value:"Cubebeat", icon:"cube-send" }
					]
				},
				{ $subview:TasksView }
			]
		};
	}
	// commented until i find a solution to save both this
	// and filtering from a text input
	// ready(){
	// 	webix.delay(() => this.$$("side:menu").select("all"),null,null,100);
	// }
}