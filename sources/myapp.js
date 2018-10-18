import "./styles/app.css";
import { JetApp, HashRouter, plugins } from "webix-jet";

export default class MyApp extends JetApp{
	constructor(config){
		const defaults = {
			id		: APPNAME,
			version : VERSION,
			router 	: HashRouter,
			debug 	: !PRODUCTION,
			start 	: "/top/dashboard",
			theme	: webix.storage.local.get("curr_theme_team_progress") || ""
		};

		super({ ...defaults, ...config });

		this.use(plugins.Locale,{ storage:webix.storage.local });
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
