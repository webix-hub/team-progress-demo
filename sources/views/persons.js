import {JetView} from "webix-jet";
import {persons} from "models/persons";

export default class PersonsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			rows:[
				{
					view:"toolbar",
					localId:"toolbar",
					elements:[
						{ view:"label", label:_("Persons") },
						{},
						{
							view:"icon", icon:"filter-variant",
							tooltip:_("Click to sort"),
							click:function(){
								let dir = "";
								if (this.config.icon.indexOf("up") !== -1){
									dir = "desc";
									this.config.icon = "arrow-down";
								}
								else {
									dir = "asc";
									this.config.icon = "arrow-up";
								}
								this.$scope.$$("list").sort("fname",dir);
								this.refresh();
							}
						},
						{ width:6 }
					]
				},
				{
					view:"list",
					localId:"list",
					css:"persons_list",
					width:230,
					select:true,
					type:{
						template:obj => `<image class="userphoto" src="data/photos/${obj.photo}.jpg" />
							<div class="text">
						  		<span class="username">${obj.fname} ${obj.lname}</span>
						  		<span class="money">$${obj.money}</span>
							</div>`,
						height:66
					},
					on:{
						onAfterSelect:(id) => {
							const person = persons.getItem(id);
							this.app.callEvent("person:select",[person]);
						}
					}
				}
			]
		};
	}
	init(){
		const list = this.$$("list");
		persons.waitData.then(() => {
			list.sync(persons);
			list.select(list.getFirstId());
		});

		this.toggleTheme(this.app.config.theme);

		this.on(this.app,"task:select", id => {
			list.select(id);
			list.showItem(id);
		});
	}
	toggleTheme(theme){
		let toolbar = this.$$("toolbar").$view;
		if (theme === "dark")
			webix.html.addCss(toolbar,"webix_dark");
		else
			webix.html.removeCss(toolbar,"webix_dark");
	}
}
