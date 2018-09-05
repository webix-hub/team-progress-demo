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
					type:"wide",
					rows:[
						StatisticsView,
						{
							type:"wide",
							cols:[
								TimeView, ProgressView
							]
						},
						{
							type:"wide",
							cols:[
								TasksView, CompareView
							]
						}
					]
				}
			]
		};
	}
}
				