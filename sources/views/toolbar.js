import {JetView} from "webix-jet";
import NotificationView from "views/notifications";

export default class ToolView extends JetView{
	config(){
		return {
			view:"toolbar", height:70,
			elements:[
				{
					view:"label", template:"Team Progress", width:200, css:"main_label"
				},
				{ 
					view:"button", type:"form", icon:"plus",
					label:"Add a task", width:160,
					click:() => {
						// add a task to the grid
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
					icon:"bell", width:40, badge:2,
					click: function(){
						this.$scope.notifications.showLatest(this.$view);
					}
				},
				{
					template:"<image class='userphoto' src='data/photos/micha.jpg'>",
					width:60, borderless:true
				}
			]
		};
	}
	init(view){
		this.notifications = this.ui(NotificationView);
	}
}
