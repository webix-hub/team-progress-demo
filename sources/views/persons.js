import {JetView} from "webix-jet";
import {persons} from "models/persons";

export default class PersonsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;
		return {
			rows:[
				{
					view:"toolbar",
					css:theme,
					localId:"toolbar",
					elements:[
						{ view:"label", label:_("Persons") },
						{},
						{
							view:"icon", icon:"mdi mdi-arrow-down",
							tooltip:_("Click to sort"),
							click:function(){
								let dir = "";
								if (this.config.icon.indexOf("up") !== -1){
									dir = "desc";
									this.config.icon = "mdi mdi-arrow-down";
								}
								else {
									dir = "asc";
									this.config.icon = "mdi mdi-arrow-up";
								}
								this.$scope.$$("list").sort("fname",dir);
								this.refresh();
							}
						}
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

		this.on(this.app,"task:select", id => {
			list.select(id);
			list.showItem(id);
		});
	}
}
