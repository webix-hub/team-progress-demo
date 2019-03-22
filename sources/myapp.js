import "./styles/app.css";
import { JetApp, HashRouter, plugins } from "webix-jet";

export default class MyApp extends JetApp{
	constructor(config){
		let theme = "";
		let cookies = true;
		try{
			theme = webix.storage.local.get("curr_theme_team_progress");
		}
		catch(err){
			cookies = false;
			webix.message("You disabled cookies, so the theme won't be restored after page reloads.","debug");
		}
		const defaults = {
			id		: APPNAME,
			version : VERSION,
			router 	: HashRouter,
			debug 	: !PRODUCTION,
			start 	: "/top/dashboard",
			theme	: theme || ""
		};

		super({ ...defaults, ...config });

		let localeConfig = {
			webix:{
				en:"en-US",
				zh:"zh-CN",
				es:"es-ES",
				ko:"ko-KR",
				ru:"ru-RU",
				de:"de-DE"
			}
		};
		if (cookies)
			localeConfig.storage = webix.storage.local;
		this.use(plugins.Locale,localeConfig);

		this.attachEvent("app:error:resolve", function() {
			webix.delay(() => this.show("/top/dashboard"));
		});
	}
}

if (!BUILD_AS_MODULE){
	webix.ready(() => {
		if (!webix.env.touch && webix.env.scrollSize && webix.CustomScroll)
			webix.CustomScroll.init();
		new MyApp().render();
	});
}

//track js errors
if (PRODUCTION){
	window.Raven
		.config(
			"https://59d0634de9704b61ba83823ec3bf4787@sentry.webix.io/12"
		)
		.install();
}
