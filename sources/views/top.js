import {JetView} from "webix-jet";
import ToolView from "views/toolbar";

export default class TopView extends JetView {
	config(){
		return {
			rows:[
				ToolView,
				{ $subview:true }
			]
		};
	}
}
