export const tasks = new webix.DataCollection({
	url:"data/tasks.json",
	scheme:{                                                                              
		$init:function(obj){                                                                          
			obj.start = webix.i18n.parseFormatDate(obj.start);
			if (obj.end) obj.end = webix.i18n.parseFormatDate(obj.end);
		}                                                                                  
	}
});
