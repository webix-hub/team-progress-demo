import {JetView} from "webix-jet";
import {tasks} from "models/tasks";
import {getPersons} from "models/persoptions";
import {getProjects} from "models/projoptions";
import {getLangsList} from "models/langslist";

export default class TasksView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const persons = getPersons();
		const projects = getProjects();
		const date_format = webix.Date.dateToStr("%d %M %y");

		return {
			view:"datatable",
			gravity:3,
			select:"multiselect",
			editable:true,
			editaction:"dblclick",
			tooltip:true,
			columns:[
				{
					id:"status", width:40, header:"", sort:"int",
					tooltip:_("Click to complete/uncomplete the task"),
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
					tooltip:_("Double-click to edit the task name"),
					template: obj => _(obj.task)
				},
				{
					id:"project", header:_("Project"),
					sort:"text", editor:"combo",
					css:"tags", width:170,
					tooltip:_("Double-click to change the project"),
					options:projects,
					template: obj => {
						if (this.getUrl()[0].page === "dashboard")
						return obj.project;
						else
						return `<span class="${obj.project.split(" ").shift().toLowerCase()} tag">&nbsp;${obj.project}&nbsp;</span>`;
					}
				},
				{
					id:"user", fillspace:1, header:_("User"),
					options:persons, sort:"text", editor:"combo",
					tooltip:_("Double-click to assign to a different employee"),
				},
				{
					id:"start", fillspace:1,
					format:date_format,
					sort:"date", tooltip:_("The task was created"),
					header:_("Start")
				},
				{
					id:"end", fillspace:1, header:_("Completed"),
					sort:"date",
					tooltip:obj => {
						return obj.end ? _("The task was completed") : _("Click on the red clock to complete the task");
					},
					template: obj => {
						if (!obj.end)
							return _("incomplete");
						else return date_format(obj.end);
					}
				}
			],
			on:{
				onAfterSelect:function(row){
					const user = this.getItem(row.id).user;
					this.$scope.app.callEvent("task:select",[user]);
					this.showItem(row.id);
				}
			},
			onClick:{
				"mdi":function(ev,id){
					const new_status = !this.getItem(id.row).status;
					const end_date = new_status ? new Date() : null;
					this.updateItem(id.row,{ status:new_status,end:end_date });
					return false;
				}
			}
		};
	}
	init(view,url){
		view.sync(tasks);

		const lang = this.app.getService("locale").getLang();
		if (lang !== "en"){
			const langs = getLangsList();
			const country = langs.find(l => l.id === lang).code;
			webix.i18n.setLocale(lang+"-"+country);
		}

		this.on(this.app,"person:select",person => {
			let res = tasks.find((obj) => person.id == obj.user);
			view.unselect();
			if (res.length){
				for (let i = 0; i < res.length; i++){
					view.select(res[i].id,true);
				}
			}
		});

		this.on(this.app,"add:task",task => {
			tasks.add(task);
			view.showItem(view.getLastId());
			if (url[0].page === "projects"){
				const proj = this.getParentView().$$("side:menu").getSelectedId();
				if (proj) this.app.callEvent("tasks:filter",[proj]);
			}
		});

		this.on(this.app,"tasks:filter",id => {
			if (id === "all")
				view.filter();
			else
				view.filter("#project#",id);

			if (!view.count())
				view.showOverlay("Looks like this project of yours needs some love and attention");
			else
				view.hideOverlay();
		});
	}
	urlChange(){
		const param = this.getParam("lookup");
		if (param)
			this.getRoot().filter(obj => {
				if (obj.task.toLowerCase().indexOf(param) !== -1) return true;
			});
	}
}
