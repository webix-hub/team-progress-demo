import {JetView} from "webix-jet";

export default class SettingsPopup extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			view:"popup",
			body:{
				view:"form", borderless:true,
				rows:[
					{
						view:"switch", onLabel:_("Dark"), offLabel:_("Light"),
						label:_("Pick your side of the Force"), labelWidth:185, width:262,
						on:{
							onChange:newv => {
								let theme = newv ? "dark" : "light";
								this.app.callEvent("theme:change",[theme]);
							}
						}
					},
					{
						view:"segmented", label:_("Pick a language"),
						labelPosition:"top",
						options:[
							{ id:"en", value:_("English") },
							{ id:"ch", value:_("Chinese") },
							{ id:"es", value:_("Spanish") }
						]
					}
				]
			}
		};
	}
	// does not work yet for popup
	// init(view){
	// 	this.on(this.app,"theme:change",theme => {
	// 		if (theme === "dark")
	// 			view.define("css","webix_dark");
	// 		else
	// 			webix.html.removeCss(view.getNode(),"webix_dark");
	// 	});
	// }
	openSettings(pos){
		this.getRoot().show(pos);
	}
}
