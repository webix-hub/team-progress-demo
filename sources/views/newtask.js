import {JetView} from "webix-jet";

export default class NewTaskPopup extends JetView {
	config(){
		return {
			view:"window",
			position:"center",
			modal:true,
			body:{
				view:"form",
				rows:[
					{ view:"text" },
					{
						view:"button", value:"Add",
						click:() => {
							this.getRoot().hide();
						}
					}
				]
			}
		}
	}
	showWindow(){
		this.getRoot().show();
	}
}