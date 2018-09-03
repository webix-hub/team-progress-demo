import {JetView} from "webix-jet";

export default class SettingsPopup extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const lang = this.app.getService("locale").getLang();

		let curr_theme = webix.storage.local.get("curr_theme_team_progress") || "light";
		curr_theme = (curr_theme === "dark") ? 1 : 0;
		
		return {
			view:"popup",
			body:{
				view:"form", borderless:true,
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
								let theme = newv ? "dark" : "light";
								this.app.callEvent("theme:change",[theme]);
								webix.storage.local.put("curr_theme_team_progress", theme);
							}
						}
					},
					{
						view:"combo", label:_("Pick a language"),
						labelPosition:"top", id:"lang", value:lang,
						options:[
							{ id:"en", code:"US", value:"English" },
							{ id:"zh", code:"CN", value:"中文" },
							{ id:"es", code:"ES", value:"Español" },
							{ id:"ko", code:"KR", value:"한국어" },
							{ id:"ru", code:"RU", value:"Русский" },
							{ id:"de", code:"DE", value:"Deutsch" }
						],
						on:{
							onChange:function(newlang){
								const country = this.getList().getItem(newlang).code;
								this.$scope.toggleLanguage(newlang,country);
							}
						}
					}
				]
			}
		};
	}
	toggleLanguage(nl,cnt){
		const langs = this.app.getService("locale");
		this.app.callEvent("lang:change",[nl,cnt]);
		webix.delay(() => langs.setLang(nl),null,null,1);
	}
	openSettings(pos){
		this.getRoot().show(pos);
	}
}
