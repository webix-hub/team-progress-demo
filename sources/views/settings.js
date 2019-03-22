import {JetView} from "webix-jet";
import {getLangsList} from "models/langslist";

import "locales/webix/de.js";
import "locales/webix/es.js";
import "locales/webix/ko.js";
import "locales/webix/ru.js";
import "locales/webix/zh.js";

export default class SettingsPopup extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const lang = this.app.getService("locale").getLang();

		let curr_theme = this.app.config.theme ? 1 : 0;

		return {
			view:"popup",
			body:{
				view:"form",
				borderless:true,
				rows:[
					{
						view:"switch",
						onLabel:_("Dark"),
						offLabel:_("Light"),
						label:_("Pick your side of the Force"),
						labelWidth:200, width:300,
						value:curr_theme,
						on:{
							onChange:newv => {
								let theme = (newv) == 1 ? "webix_dark" : "";
								this.app.config.theme = theme;
								try{
									webix.storage.local.put("curr_theme_team_progress", theme);
								}
								catch(err){/* for disabled cookies */}
								webix.delay(() => {
									if (this.app) this.app.refresh();
								},this,null,500);
							}
						}
					},
					{
						view:"combo", localId:"langs",
						label:_("Pick a language"),
						labelPosition:"top", value:lang,
						options:getLangsList(),
						on:{
							onChange:function(newlang){
								this.$scope.toggleLanguage(newlang);
							}
						}
					}
				]
			}
		};
	}
	toggleLanguage(newlang){
		const langs = this.app.getService("locale");
		webix.delay(() => langs.setLang(newlang));
	}
	showWindow(pos){
		this.getRoot().show(pos);
	}
}
