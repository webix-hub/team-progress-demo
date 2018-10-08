import {JetView} from "webix-jet";
import PersonsView from "views/persons";
import StatisticsView from "views/statistics";
import TimeView from "views/time";
import ProgressView from "views/progress";
import TasksView from "views/tasks";
import CompareView from "views/compare";

export default class DashboardView extends JetView{
	config(){
		return {
			type:"space", paddingX:0,
			cols:[
				PersonsView,
				{
					view:"scrollview",
					body:{
						type:"wide",
						rows:[
							StatisticsView,
							{
								height:345,
								type:"wide",
								cols:[
									TimeView, ProgressView
								]
							},
							{
								height:345,
								type:"wide",
								cols:[
									TasksView, CompareView
								]
							}
						]
					}
				},
				{ width:1 }
			]
		};
	}
}
				