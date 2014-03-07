var Square = Backbone.Model.extend({
	initialize : function(options){
		options = options || {};	
		this.decay = options.decay || 0;
		this.piece = options.piece || "none";

	}
	
});
