import {JetView} from "webix-jet";
import ToolView from "views/toolbar";
import PersonsView from "views/persons";
import StatisticsView from "views/statistics";
import TimeDonut from "views/time";

export default class TopView extends JetView {
	config(){
		return {
			rows:[
				ToolView,
				{
					type:"space",
					cols:[
						PersonsView,
						{
							type:"wide",
							rows:[
								StatisticsView,
								{
									type:"wide",
									cols:[
										TimeDonut,
										{ template:"progress chart area spline" }
									]
								},
								{
									type:"wide",
									cols:[
										{ template:"direction datatable" },
										{ template:"compare bar chart" }
									]
								}
							]
						}
					]
				}
			]
		};
	}
}
