import {JetView} from "webix-jet";
import {getNotifications} from "models/notifications";

export default class NotificationPopup extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			view:"popup",
			body:{
				rows:[
					{
						view:"list",
						localId:"list",
						borderless:true,
						css:"notifications",
						width:250, height:250,
						template:(obj,common) => {
							return (!obj.read ? common.itemNew() : "") +
								"<span class='m_title" + (!obj.read ? " unread" :"") + "'>"
								+ _(obj.title) + "</span>" +
								"<span class='message'>" + _(obj.message) + "</span>";
						},
						type:{
							itemNew: () => "<span class='webix_icon mdi mdi-alert-decagram unread'></span>",
							height:"auto"
						}
					},
					{
						template:"<a class='link'>"+_("See all notifications")+"</a>",
						autoheight:true, borderless:true
					}
				]
			}
		};
	}
	init(){
		this.$$("list").sync(getNotifications());
	}
	showWindow(pos){
		this.getRoot().show(pos);
	}
}
