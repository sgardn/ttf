
var Board = Backbone.View.extend({

	model : Grid,

    el: $('#board'),

  	events: {
    	"click .block": "click",
  	},

  	click : function(e){
  		e.preventDefault();
  		e.stopPropagation();
  		console.log($(e.currentTarget).attr("class"));
  	},

  	template: "<div class='block top left'/><div class='block top mid'/><div class='block top right'/>"
  		+ "<div class='block center left'/><div class='block center mid'/><div class='block center right'/>"
  		+ "<div class='block bottom left'/><div class='block bottom mid'/><div class='block bottom right'/>",

  	initialize: function() {
	    // this.listenTo(this.model, "change", this.render);
	    this.model = new Grid();
	    for (var i=0;i<9;i++) { 
			this.model.add(new Square(), {"at":i});	
		}
	    console.log(this.model.length);
	    console.log(this.model.at(0));
	    // starts at 0...
  	},

  	render: function() {
  		var template = _.template( this.template );
        this.$el.append( template );
  	}

});