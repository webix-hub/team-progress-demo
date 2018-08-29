import {JetView} from "webix-jet";
import {tasks} from "models/tasks";
import {persons} from "models/persons";

export default class TasksView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			view:"datatable",
			gravity:2,
			select:"multiselect",
			columns:[
				{
					id:"status", width:40, header:"", sort:"int",
					template: obj => {
						if (obj.status)
							return "<span class='webix_icon mdi mdi-check-circle complete'></span>";
						else
							return "<span class='webix_icon mdi mdi-clock incomplete'></span>";
					}
				},
				{
					id:"task", fillspace:3, header:_("Task"), sort:"text",
					template: obj => _(obj.task)
				},
				{
					id:"project", fillspace:1, header:_("Project"), sort:"text",
					template: obj => `<span class="${obj.project.toLowerCase()} tag">&nbsp;${obj.project}&nbsp;</span>`
				},
				{
					id:"user", fillspace:1, header:"User",
					collection:persons, sort:"text"
				},
				{
					id:"start", fillspace:1, format:webix.Date.dateToStr("%d %M %y"),
					sort:"date", header:"Start"
				},
				{
					id:"end", fillspace:1, header:"Completed",
					sort:"date", template: obj => {
						const format = webix.Date.dateToStr("%d %M %y");
						if (!obj.end)
							return _("incomplete");
						else return format(obj.end);
					}
				}
			],
			on:{
				onAfterSelect:row => {
					const user = this.getRoot().getItem(row.id).user;
					this.app.callEvent("task:select",[user]);
				}
			}
		};
	}
	init(view){
		view.sync(tasks);

		this.on(this.app,"person:select",(name,pr,id) => {
			let res = tasks.find((obj) => id == obj.user);
			view.select(res[0].id);
			view.showItem(res[0].id);	  
		});
	}
}
