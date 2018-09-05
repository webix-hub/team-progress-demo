import {JetView} from "webix-jet";
import {getPersons} from "models/persoptions";
import {getProjects} from "models/projoptions";

export default class NewTaskPopup extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const persons = getPersons();
		const projects = getProjects();

		return {
			view:"window",
			position:"center",
			modal:true,
			head:_("Add a new task"),
			body:{
				view:"form",
				localId:"form",
				elementsConfig:{ labelPosition:"top" },
				rows:[
					{ view:"text", label:_("Task"), name:"task", width:500 },
					{
						cols:[
							{
								view:"combo", label:_("Project"),
								name:"project", options:projects
							},
							{
								view:"combo", label:_("Assignee"),
								name:"user", options:persons
							}
						]
					},
					{
						cols:[
							{
								view:"button", value:_("Cancel"),
								click:() => this.getBack()
							},
							{
								view:"button", value:_("Add"), type:"form",
								click:() => this.saveTask()
							}
						]
					}
				],
				rules:{
					user:webix.rules.isNotEmpty,
					task:webix.rules.isNotEmpty
				}
			}
		};
	}
	showWindow(){
		this.getRoot().show();
	}
	getBack(){
		this.getRoot().hide();
		this.$$("form").clear();
		this.$$("form").clearValidation();
	}
	saveTask(){
		const task = this.$$("form").getValues();
		if (this.$$("form").validate()){
			this.app.callEvent("add:task",[task]);
			this.getBack();
		}
	}
}
