import {JetView} from "webix-jet";
import ToolbarView from "views/toolbar";

export default class TopView extends JetView {
	config(){
		return {
			rows:[
				ToolbarView,
				{ $subview:true }
			]
		};
	}
}
