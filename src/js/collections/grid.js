var Grid = Backbone.Collection.extend({
	model : Square,
	initialize : function(){
		console.log("creating our grid collection");
	}
});
