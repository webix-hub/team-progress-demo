import {JetView} from "webix-jet";
import NotificationPopup from "views/notifications";
import SettingsPopup from "views/settings";
import NewTaskPopup from "views/newtask";

export default class ToolbarView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;
		
		return {
			view:"toolbar",
			css:theme,
			height:56,
			elements:[
				{ css:"logo", width:53, batch:"default" },
				{
					paddingY:5,
					rows:[
						{
							margin:8,
							cols:[
								{
									view:"label",
									label:_("Team Progress"),
									width:175,
									css:"main_label",
									batch:"default"
								},
								{
									view:"button",
									type:"form",
									label:_("Add a task"),
									autowidth:true,
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
										{ width:11 },
										{
											view:"text", localId:"lookup",
											placeholder:"Type in to look for a task",
											on:{
												onKeyPress(code){
													const lookup = this.getValue();
													if (code === 13){
														const nav_btn = this.$scope.$$("favs");
														if (nav_btn.config.icon.indexOf("check") !== -1){
															nav_btn.config.icon = "mdi mdi-view-dashboard";
															nav_btn.config.tooltip = "Go back to the dashboard";
															nav_btn.refresh();
														}
														this.$scope.show("projects" + (lookup ? "?lookup="+lookup : ""));
													}
												}
											}
										},
										{
											view:"icon", icon:"mdi mdi-close",
											click:() => this.toggleBatches("default","search")
										}
									]
								},
								{
									view:"icon", icon:"mdi mdi-magnify",
									tooltip:_("Click to search a task"),
									click:() => {
										const lookup = this.$$("lookup");
										const lookuptext = this.$$("lookup").getValue();
										if (!this.$$("search").isVisible())
											this.toggleBatches("search","default");
										else if (lookup)
											this.show("projects?lookup="+lookuptext);
										lookup.focus();
									}
								},
								{
									view:"icon", icon:"mdi mdi-bookmark-check",
									localId:"favs", batch:"default",
									click:function(){
										if (this.config.icon.indexOf("check") !== -1)
											this.$scope.show("projects");
										else
											this.$scope.show("dashboard");
									}
								},
								{
									view:"icon",
									icon:"mdi mdi-bell",
									badge:3,
									batch:"default",
									localId:"bell",
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
					template:`<image class="mainphoto" src="data/photos/dottie.jpg" webix_tooltip="${_("Change your personal settings")}">`,
					width:60, localId:"avatar",
					borderless:true,
					batch:"default",
					onClick:{
						"mainphoto":function(){
							this.$scope.settings.showWindow(this.$view);
							return false;
						}
					}
				},
				{ width:4 }
			]
		};
	}
	init(){
		this.notifications = this.ui(NotificationPopup);
		this.settings = this.ui(SettingsPopup);
		this.newtask = this.ui(NewTaskPopup);

		this.on(this.app,"read:notifications",() => {
			this.$$("bell").config.badge = 0;
			this.$$("bell").refresh();

			setTimeout(() => {
				if (this.app){
					this.$$("bell").config.badge += 1;
					this.$$("bell").refresh();
					this.app.callEvent("new:notification");
				}
			},10000);
		});

		webix.TooltipControl.addTooltip(this.$$("avatar").$view);
	}
	urlChange(ui,url){
		const _ = this.app.getService("locale")._;
		let nav_btn = this.$$("favs");
		if (url[1].page === "projects"){
			nav_btn.config.icon = "mdi mdi-view-dashboard";
			nav_btn.define("tooltip",_("Go back to the dashboard"));
		}
		else if (url[1].page === "dashboard"){
			nav_btn.config.icon = "mdi mdi-bookmark-check";
			nav_btn.define("tooltip",_("Open the list of all tasks"));
		}
		nav_btn.refresh();
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
