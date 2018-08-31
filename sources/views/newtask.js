import {JetView} from "webix-jet";
import {persons} from "models/persons";
import {projects} from "models/projoptions";

export default class NewTaskPopup extends JetView {
	config(){
		return {
			view:"window",
			position:"center",
			modal:true,
			head:"Add a new task",
			body:{
				view:"form",
				elementsConfig:{ labelPosition:"top" },
				rows:[
					{
						view:"text", label:"Task", name:"task",
						width:500
					},
					{
						cols:[
							{
								view:"combo", label:"Project",
								name:"project", options:[]
							},
							{
								view:"combo", label:"Assignee",
								name:"user", options:[]
							}
						]
					},
					{
						cols:[
							{
								view:"button", value:"Cancel",
								click:() => {
									this.getBack();
								}
							},
							{
								view:"button", value:"Add", type:"form",
								click:() => {
									this.saveTask();
								}
							}
						]
					}
				],
				rules:{
					"task":webix.rules.isNotEmpty
				}
			}
		}
	}
	init(view){
		view.queryView({ name:"user" }).getList().data.sync(persons);
		view.queryView({ name:"project" }).getList().parse(projects);
	}
	showWindow(){
		this.getRoot().show();
	}
	getBack(){
		this.getRoot().hide();
		this.getRoot().getBody().clear();
		this.getRoot().getBody().clearValidation();
	}
	saveTask(){
		const task = this.getRoot().getBody().getValues();
		if (this.getRoot().getBody().validate()){
			this.app.callEvent("add:task",[task]);
			this.getBack();
		}
	}
}
