import {JetView} from "webix-jet";
import NotificationView from "views/notifications";
import SettingsPopup from "views/settings";
import NewTaskPopup from "views/newtask";

export default class ToolView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
		return {
			view:"toolbar", height:70,
			elements:[
				{
					view:"label", template:_("Team Progress"), width:200, css:"main_label"
				},
				{ 
					view:"button", type:"form", icon:"plus",
					label:_("Add a task"), width:160,
					click:() => {
						this.newtask.showWindow();
					}
				},
				{},
				{
					localId:"search", hidden:true, margin:0,
					cols:[
						{ view:"text" },
						{
							view:"button", type:"icon", icon:"close",
							css:"toolbar_button close", width:40, click: () => {
								this.$$("search").hide();
							}
						}
					]
				},
				{
					view:"button", type:"icon", css:"toolbar_button",
					icon:"magnify", width:40, click:() => {
						this.$$("search").show();
					}
				},
				{
					view:"button", type:"icon", css:"toolbar_button",
					icon:"bookmark-check", width:40
				},
				{
					view:"button", type:"icon", css:"toolbar_button",
					icon:"bell", width:40, badge:2, tooltip:_("View the latest notifications"),
					click:function(){
						this.$scope.notifications.showLatest(this.$view);
					}
				},
				{
					template:"<image class='userphoto' src='data/photos/micha.jpg' title=" + _("Change your personal settings") + ">",
					width:60, borderless:true,
					onClick:{
						"userphoto":function(){
							this.$scope.settings.openSettings(this.$view);
							return false;
						}
					}
				}
			]
		};
	}
	init(){
		this.notifications = this.ui(NotificationView);
		this.settings = this.ui(SettingsPopup);
		this.newtask = this.ui(NewTaskPopup);

		const curr_theme = webix.storage.local.get("curr_theme_team_progress");
		if (curr_theme)
			this.toggleTheme(curr_theme);

		this.on(this.app,"theme:change",theme => this.toggleTheme(theme));
	}
	toggleTheme(theme){
		let toolbar = this.getRoot();
		if (theme === "dark"){
			toolbar.define("css","webix_dark");
		}
		else
			webix.html.removeCss(toolbar.getNode(),"webix_dark");
	}
}
