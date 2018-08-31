export const tasks = new webix.DataCollection({
	url:"data/tasks.json",
	scheme:{                                                                              
		$init:function(obj){                                                                          
			obj.start = webix.i18n.parseFormatDate(obj.start);
			if (obj.end) obj.end = webix.i18n.parseFormatDate(obj.end);
		},
		status:0,
		user:"no asignee",
		project:"no project",
		start:new Date(),
		end:null
	}
});
