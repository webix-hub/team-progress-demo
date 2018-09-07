import {JetView} from "webix-jet";
import NotificationPopup from "views/notifications";
import SettingsPopup from "views/settings";
import NewTaskPopup from "views/newtask";

export default class ToolbarView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
		
		return {
			view:"toolbar",
			height:56,
			elements:[
				{ css:"logo", width:53, batch:"default" },
				{
					paddingY:7,
					rows:[
						{
							cols:[
								{
									view:"label",
									template:_("Team Progress"),
									width:183,
									batch:"default"
								},
								{ 
									view:"button",
									type:"form",
									label:_("Add a task"),
									width:160,
									inputHeight:40,
									batch:"default",
									click:() => this.newtask.showWindow()
								},
								{ batch:"default" },
								{
									localId:"search",
									margin:0,
									batch:"search",
									hidden:true,
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
											view:"icon", icon:"close", css:"close",
											click:() => this.toggleBatches("default","search")
										}
									]
								},
								{
									view:"icon", icon:"magnify",
									tooltip:_("Click to search a task"),
									click:() => {
										const lookup = this.$$("lookup").getValue();
										if (!this.$$("search").isVisible())
											this.toggleBatches("search","default");
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
								}
							]
						}
					]
				},
				{
					template:`<image class="userphoto" src="data/photos/micha.jpg" title="${_("Change your personal settings")}">`,
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
	toggleBatches(a,b){
		const s_btns = this.getRoot().queryView({ batch:a },"all");
		for (let i = 0; i < s_btns.length; i++)
			s_btns[i].show();
		const h_btns = this.getRoot().queryView({ batch:b },"all");
		for (let i = 0; i < h_btns.length; i++)
			h_btns[i].hide();
	}
}
