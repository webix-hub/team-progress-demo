import {JetView} from "webix-jet";
import NotificationPopup from "views/notifications";
import SettingsPopup from "views/settings";
import NewTaskPopup from "views/newtask";

export default class ToolbarView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
		
		return {
			view:"toolbar", height:56,
			visibleBatch:"default",
			elements:[
				{ css:"logo", width:63, batch:"default" },
				{
					view:"label", template:_("Team Progress"),
					width:200, css:"main_label",
					batch:"default"
				},
				{ 
					view:"button", type:"form", icon:"plus",
					label:_("Add a task"), width:160,
					batch:"default",
					click:() => this.newtask.showWindow()
				},
				{ batch:"default" },
				{
					localId:"search",
					margin:0,
					batch:"search",
					cols:[
						{
							view:"text", localId:"lookup",
							on:{
								onKeyPress(code){
									const lookup = this.getValue();
									if (lookup && code === 13){
										const nav_btn = this.$scope.$$("favs");
										if (nav_btn.config.icon.indexOf("check") !== -1){
											nav_btn.config.icon = "view-dashboard";
											nav_btn.config.tooltip = "Go back to the dashboard";
											nav_btn.refresh();
										}
										this.$scope.show("projects?lookup="+lookup);
									}
								}
							}
						},
						{
							view:"button", type:"icon", icon:"close",
							css:"toolbar_button close", width:40,
							click:() => this.getRoot().showBatch("default")
						}
					]
				},
				{
					view:"icon", icon:"magnify",
					tooltip:_("Click to search a task"),
					click:() => {
						const lookup = this.$$("lookup").getValue();
						if (!this.$$("search").isVisible())
							this.getRoot().showBatch("search");
						else if (lookup)
							this.show("projects?lookup="+lookup);
					}
				},
				{
					view:"icon", icon:"bookmark-check",
					tooltip:_("Open the list of all tasks"),
					localId:"favs", batch:"default",
					click:function(){
						if (this.config.icon.indexOf("check") !== -1)
							this.$scope.show("projects");
						else
							this.$scope.show("dashboard");
					}
				},
				{
					view:"icon", icon:"bell", badge:2,
					batch:"default",
					tooltip:_("View the latest notifications"),
					click:function(){
						this.$scope.notifications.showWindow(this.$view);
					}
				},
				{
					template:`<image class="userphoto" src="data/photos/micha.jpg" title=" ${_("Change your personal settings")}">`,
					width:58,
					borderless:true,
					batch:"default",
					onClick:{
						"userphoto":function(){
							this.$scope.settings.showWindow(this.$view);
							return false;
						}
					}
				}
			]
		};
	}
	init(){
		this.notifications = this.ui(NotificationPopup);
		this.settings = this.ui(SettingsPopup);
		this.newtask = this.ui(NewTaskPopup);

		this.toggleTheme(this.app.config.theme);
	}
	urlChange(ui,url){
		const _ = this.app.getService("locale")._;
		let nav_btn = this.$$("favs");
		if (url[1].page === "projects"){
			nav_btn.config.icon = "view-dashboard";
			nav_btn.config.tooltip = _("Go back to the dashboard");
		}
		else if (url[1].page === "dashboard"){
			nav_btn.config.icon = "bookmark-check";
			nav_btn.config.tooltip = _("Open the list of all tasks");
		}
		nav_btn.refresh();
	}
	toggleTheme(theme){
		let toolbar = this.getRoot().$view;
		if (theme === "dark"){
			webix.html.addCss(toolbar,"webix_dark");
		}
		else
			webix.html.removeCss(toolbar,"webix_dark");
	}
}
