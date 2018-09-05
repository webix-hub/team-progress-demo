export function getNotifications(){
	return notifications;
}

const notifications = new webix.DataCollection({
	data:[
		{ title:"Latest tasks in your projects", message:"Top margin in a popup window is smaller than the...", read:0 },
		{ title:"Autocat report", message:"Navigations problem in the left menu", read:0 },
		{ title:"Assignment", message:"Gita Noda assigned you a new ticket", read:1 },
		{ title:"Lorena Rush added new tasks", message:"'Confirm' button styling", read:1 },
		{ title:"Cubebeat report", message:"No ability to exit profile editing dialogue", read:1 }
	]
});
