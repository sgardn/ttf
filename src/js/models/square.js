var Square = Backbone.Model.extend({
	initialize : function(options){
		// console.log("initializing Square");
		// console.log(options);
		if(options){
			this.decay = options.decay || 0;
			this.piece = options.piece || "none";
		}

	},

	defaults : {
		decay : 0,
		piece : "none"
	}

});
