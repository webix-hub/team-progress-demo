let i = 0;
export function newNotification(){
	return webix.copy(notifications[i++%notifications.length]);
}
const notifications = [
	{
		title:"Ain't it amazing?",
		message:"Meaning the view from your window. Even if it's too urban or too industrial to your taste, you can find curious beauty in its geometry.",
		read:0
	},
	{
		title:"Components",
		message:"Can you name all the Webix components that have been used to build the demo app?",
		read:0
	},
	{
		title:"We miss you",
		message:"Been pretty busy lately, haven't you? That's great! But also do not forget about us.",
		read:0
	},
	{
		title:"Have a nice day",
		message:"Dear client, whenever you are reading this, we wish you a merry day. May luck and success attend you.",
		read:0
	},
	{
		title:"Colors and Languages",
		message:"To pick a language or the color theme for the demo app, click on the avatar in the top right corner.",
		read:0
	},
	{
		title:"We love you",
		message:"Dear client, we love you very much. If our feelings are mutual, contact us and download Webix. Then we will love you eternally.",
		read:0
	}
];
