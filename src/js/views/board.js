var Board = Backbone.View.extend({

    el: $('#board'),

    events: {
        // "click .block": "click",
    },

    template: "<div class='block top left'/><div class='block top mid'/><div class='block top right'/>" + "<div class='block center left'/><div class='block center mid'/><div class='block center right'/>" + "<div class='block bottom left'/><div class='block bottom mid'/><div class='block bottom right'/>",

    initialize: function(options) {
        console.log("initializing our Board View");
        this.model = new Grid(options.sideLength);
        this.gameOver = false;
        this.children = [];
        var temp;
        // this.on("click .block", this.click);
        for (var i = 0; i < options.sideLength; i++) {
            for (var j = 0; j < options.sideLength; j++){
                temp = new Square({side: options.sideLength, index:i*options.sideLength + j});
                this.model.add(temp);
                this.children.push(new SquareView(temp, {parent: this}));
            }
        }
        // this.model.on( "change:piece", this.render, this);
        // cannot run this on change else once the first piece ages out of existence it calls age for the rest
        this.whoseMove = "X";
        this.showMove();
        _.each(this.children, (function (c){
            this.listenTo(c, 'newPiece', this.newPiece);
        }), this);        
    },

    newPiece : function(i) {
        console.log("need to re render at "+i);
        //  prereq -> move is valid...
        this.render(i);
        this.changeMove();
    },

    showMove: function() {
        $("#status").html("<h1>It's " + this.whoseMove + "'s turn to play</h1>");
    },

    changeMove: function() {
        if (this.whoseMove == "X") {
            this.whoseMove = "O";
        } else {
            this.whoseMove = "X";
        }
        this.showMove();
    },

    play: function(piece, index) {
        var p = this.model.at(index);
        if (p.get("decay") === 0) {
            if (p.get("piece") != "none") {
                throw "broken square piece";
            } else {
                p.set("piece", piece);
                this.render();
                this.changeMove();
                this.checkWin(index, piece);
            }
        } else {
            console.log("cannot place here...");
        }
    },

    render: function(i) {
        console.log("i");
        console.log(i);
        this.model.each(function(c){
            c.age();
        });
        // if(i === undefined){
            console.log("parent render running");
            var that = this;
            this.$el.empty();
            _.each(this.children, (function(c){
                that.$el.append(c.render().el);
            }));
        // } else {
            //  at this point we're re rendering a specific view
            //  let's grab it based on the index 
        // }            
            

    },

    checkWin: function(i, p) {
        var w = this.checkRow(i, p) || this.checkColumn(i, p) || this.checkDiagonal(i, p);
        if (w) {
            this.gameOver = true;
            $("#status").html("<h1> " + p + " has won!</h1>");
        }
    },

    checkRow: function(i, p) {
        var row = Math.floor(i / 3);
        var ans = true;
        for (var j= 0; i < 3; i++) {
            ans = ans && (this.model.at(row * 3 + j).get("piece") == p);
        }
        return ans;
    },

    checkColumn: function(index, p) {
        var column = index % 3;
        var ans = true;
        for (var i = 0; i < 3; i++) {
            ans = ans && (this.model.at(column + i * 3).get("piece") == p);
        }
        return ans;
    },

    checkDiagonal: function(i, p) {
        if (i === 0 || i === 4 || i === 8) {
            if (   (this.model.at(0).get("piece") == p)
                && (this.model.at(4).get("piece") == p)
                && (this.model.at(8).get("piece") == p) ) {
                    return true;
            }
        }
        if (i === 2 || i === 4 || i === 6) {
            if (   (this.model.at(0).get("piece") == p)
                && (this.model.at(4).get("piece") == p)
                && (this.model.at(8).get("piece") == p) ) {
                    return true;
            }
        }
        return false;
    }
});
