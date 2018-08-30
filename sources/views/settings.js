import {JetView} from "webix-jet";

export default class SettingsPopup extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const lang = this.app.getService("locale").getLang();
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
						labelPosition:"top", id:"lang", value:lang,
						options:[
							{ id:"en", value:"English" },
							{ id:"ch", value:"中文" },
							{ id:"es", value:"Español" }
						],click:() => this.toggleLanguage()
					}
				]
			}
		};
	}
	toggleLanguage(){
        const langs = this.app.getService("locale");
        const value = this.$$("lang").getValue();
        langs.setLang(value);
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
