import {JetView} from "webix-jet";
import {tasks} from "models/tasks";
import {persons} from "models/persoptions";
import {projects} from "models/projoptions";

export default class TasksView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			view:"datatable",
			gravity:2,
			select:"multiselect",
			editable:true, editaction:"dblclick",
			tooltip:true,
			columns:[
				{
					id:"status", width:40, header:"", sort:"int",
					tooltip:"Click to complete/uncomplete the task",
					template: obj => {
						if (obj.status)
							return "<span class='webix_icon mdi mdi-check-circle complete'></span>";
						else
							return "<span class='webix_icon mdi mdi-clock incomplete'></span>";
					}
				},
				{
					id:"task", fillspace:3, header:_("Task"),
					sort:"text", editor:"text",
					tooltip:"Double-click to edit the task name",
					template: obj => _(obj.task)
				},
				{
					id:"project", fillspace:1, header:_("Project"),
					sort:"text", editor:"select",
					tooltip:"Double-click to change the project",
					options:projects,
					template: obj => {
						return `<span class="${obj.project.toLowerCase()} 
							tag">&nbsp;${obj.project}&nbsp;</span>`;
					}
				},
				{
					id:"user", fillspace:1, header:_("User"),
					options:persons, sort:"text", editor:"select",
					tooltip:"Double-click to assign to a different employee",
				},
				{
					id:"start", fillspace:1,
					format:webix.Date.dateToStr("%d %M %y"),
					sort:"date", tooltip:"The task was created",
					header:_("Start")
				},
				{
					id:"end", fillspace:1, header:_("Completed"),
					sort:"date",
					tooltip:obj => {
						return obj.end ? `The task was completed` : `Click on the red clock to complete the task`;
					},
					template: obj => {
						const format = webix.Date.dateToStr("%d %M %y");
						if (!obj.end)
							return _("incomplete");
						else return format(obj.end);
					}
				}
			],
			on:{
				onAfterSelect:function(row){
					const user = this.$scope.getRoot().getItem(row.id).user;
					this.$scope.app.callEvent("task:select",[user]);
					this.showItem(row.id);
				}
			},
			onClick:{
				"mdi":function(ev,id){
					const new_status = !this.getItem(id.row).status;
					const end_date = new_status ? new Date() : null;
					this.updateItem(id.row,{ status:new_status,end:end_date });
				}
			}
		};
	}
	init(view){
		view.sync(tasks);

		this.on(this.app,"person:select",(name,pr,id) => {
			let res = tasks.find((obj) => id == obj.user);
			view.unselect();
			if (res.length){
				for (let i = 0; i < res.length; i++){
					view.select(res[i].id,true)
				}
			}
		});

		this.on(this.app,"add:task",task => {
			tasks.add(task);
			view.showItem(view.getLastId());
		});
	}
}
