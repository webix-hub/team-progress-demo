export const tasks = new webix.DataCollection({
	url:"data/tasks.json",
	scheme:{                                                                              
		$init:function(obj){                                                                          
			obj.start = webix.i18n.parseFormatDate(obj.start);
			if (obj.end) obj.end = webix.i18n.parseFormatDate(obj.end);

			const curr_date = new Date();
			const curr_month = curr_date.getMonth();
			const curr_year = curr_date.getFullYear();
			if (curr_month !== 8){
				obj.start.setMonth(curr_month);
				if (obj.end){
					obj.end.setMonth(curr_month);
					obj.end.setDate(obj.start.getDate()+2);
				}
			}
			if (curr_year !== 2018){
				obj.start.setYear(curr_year);
				if (obj.end) obj.end.setYear(curr_year);
			}
		},
		status:0,
		user:"no asignee",
		project:"no project",
		start:new Date(),
		end:null
	}
});
