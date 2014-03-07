var Square = Backbone.Model.extend({
	defaults : {
		decay : 0,
		piece : "none"
	},

	initialize : function(){
		this.on("change:piece", this.changing);
	},

	changing : function(){
		console.log("changing...");
		// test if our new value for piece is none
		// if it is none, do nothing
		// else, set the decay of the piece to six or whatever
	},

	age : function() {
		if(this.decay > 0){
			this.decay = this.decay-1;
		}
		if(this.decay == 0){
			this.piece = "none";
		}
		return this;
	}

});
