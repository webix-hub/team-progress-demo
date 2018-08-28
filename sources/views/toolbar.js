import {JetView} from "webix-jet";

export default class ToolView extends JetView{
	config(){
		return {
			view:"toolbar", height:70,
			elements:[
				{
					view:"label", template:"Team Progress", width:200
				},
				{ 
					view:"button", type:"form", icon:"plus",
					label:"Add a task", width:200,
					click:()=>{
						// add a task to the grid
					}
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
