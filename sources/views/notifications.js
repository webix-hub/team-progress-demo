import {JetView} from "webix-jet";
// import {getNotifications} from "models/notifications";
import {newNotification} from "models/newnotifications";

export default class NotificationPopup extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			view:"popup",
			body:{
				view:"list",
				localId:"list",
				borderless:true,
				css:"notifications",
				width:250,
				autoheight:true,
				template:obj => {
					return "<span class='m_title'>"+ _(obj.title) + "</span>" +
						"<span class='message'>" + _(obj.message) + "</span>";
				},
				type:{
					height:80
				},
				data:[
					{ title:"Latest tasks in your projects", message:"Top margin in a popup window is smaller than the...", read:0 },
					{ title:"Autocat report", message:"Navigations problem in the left menu", read:0 },
					{ title:"Assignment", message:"Gita Noda assigned you a new ticket", read:1 },
					{ title:"Lorena Rush added new tasks", message:"'Confirm' button styling", read:1 },
					{ title:"Cubebeat report", message:"No ability to exit profile editing dialogue", read:1 }
				]
			},
			on:{
				onHide:() => {
					this.app.callEvent("read:notifications");
					this.$$("list").clearAll();
				}
			}
		};
	}
	init(){
		const list = this.$$("list");
		//list.sync(getNotifications());

		this.on(this.app,"new:notification",() => {
			list.add(newNotification(),0);
		});
	}
	showWindow(pos){
		this.getRoot().show(pos);
	}
}
