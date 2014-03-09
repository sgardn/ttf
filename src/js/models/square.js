var Square = Backbone.Model.extend({
	defaults : {
		decay : 0,
		piece : "none"
	},

	initialize : function(){
		this.on("change:piece", this.changing);
	},

	changing : function(){
		// this.changed stores the object with properties for all attributes changed
		if(this.changed.piece != "none"){
			// console.log("setting decay to 6 for a "+this.changed.piece);
			this.set("decay", 7);
			// todo make sure this is the right number...
		}
	},

	age : function() {
		if(this.get("decay") > 0){
			this.set("decay", this.get("decay") - 1);
		}
		if(this.get("decay") == 0){
			this.set("piece", "none");
		}
		return this;
	}, 
	log : function() {
		console.log(this.get("piece")+" "+this.get("decay"));
	}

});
