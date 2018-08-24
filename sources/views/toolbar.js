import {JetView} from "webix-jet";

export default class ToolView extends JetView{
	config(){
		return {
			view:"toolbar", height:70,
			elements:[
				{
					view:"label", template:"Team Progress", width:200,
					css:"main_label"
				},
				{ 
					view:"button", type:"iconButton", icon:"plus",
					label:"Add person", width:140,
					height:40,
					click:()=>{}
				},
				{},
				{
					view:"button", type:"icon", css:"toolbar_button",
					icon:"magnify", width:40
				},
				{
					view:"button", type:"icon", css:"toolbar_button",
					icon:"bookmark-check", width:40
				},
				{
					view:"button", type:"icon", css:"toolbar_button",
					icon:"bell", width:40
				},
				{
					template:"<image class='userphoto' src='data/photos/micha.jpg'>",
					width:60, borderless:true
				}
			]
		};
	}
}
