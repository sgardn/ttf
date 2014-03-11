var Board = Backbone.View.extend({

    model: Grid,

    el: $('#board'),

    events: {
        "click .block": "click",
    },

    template: "<div class='block top left'/><div class='block top mid'/><div class='block top right'/>" + "<div class='block center left'/><div class='block center mid'/><div class='block center right'/>" + "<div class='block bottom left'/><div class='block bottom mid'/><div class='block bottom right'/>",

    initialize: function() {
        this.model = new Grid();
        this.gameOver = false;
        // this.on("click .block", this.click);
        for (var i = 0; i < 9; i++) {
            this.model.add(new Square());
        }
        // this.model.on( "change:piece", this.render, this);
        // cannot run this on change else once the first piece ages out of existence it calls age for the rest
        this.whoseMove = "X";
        this.showMove();
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

    parseClick: function(classes) {
        var indx = 0;
        if (classes.match(/mid/)) {
            indx += 1;
        }
        if (classes.match(/right/)) {
            indx += 2;
        }
        if (classes.match(/center/)) {
            indx += 3;
        }
        if (classes.match(/bottom/)) {
            indx += 6;
        }
        return indx;
    },

    click: function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.gameOver) {
            var classes = $(e.currentTarget).attr("class");
            var indx = this.parseClick(classes);
            this.play(this.whoseMove, indx);
        }
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

    renderSquare: function(m, i) {
        var classes = ".block";
        if (i % 3 === 0) {
            classes += ".left";
        } else if (i % 3 === 1) {
            classes += ".mid";
        } else {
            classes += ".right";
        }
        if (i / 3 >= 2) {
            classes += ".bottom";
        } else if (i / 3 < 1) {
            classes += ".top";
        } else {
            classes += ".center";
        }
        // ez mode
        // this.$el.children(classes).html("<span class='piece smaller'>"+m.get("piece")+" "+m.get("decay") +"</span>");
        this.$el.children(classes).html("<span class='piece'>" + m.get("piece") + "</span>");
    },

    render: function() {
        var m;
        var template = _.template(this.template);
        this.$el.html(template);
        var index = 1;
        for (var i = 0; i < 9; i++) {
            m = this.model.at(i);
            if (m.get("decay") > 0) {
                m.age();
                if (m.get("decay") !== 0) {
                    this.renderSquare(m, i);
                }
            }
            m = this.model.at(index);
        }
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

    checkColumn: function(i, p) {
        var column = i % 3;
        var ans = true;
        for (var i = 0; i < 3; i++) {
            ans = ans && (this.model.at(column + i * 3).get("piece") == p);
        }
        return ans;
    },

    checkDiagonal: function(i, p) {
        var ans = true;
        if (i === 0 || i === 4 || i === 8) {
            ans = ans && (this.model.at(0).get("piece") == p);
            ans = ans && (this.model.at(4).get("piece") == p);
            ans = ans && (this.model.at(8).get("piece") == p);
            if (ans) return ans;
        }
        if (i === 2 || i === 4 || i === 6) {
            ans = ans && (this.model.at(2).get("piece") == p);
            ans = ans && (this.model.at(4).get("piece") == p);
            ans = ans && (this.model.at(6).get("piece") == p);
            if (ans) return ans;
        }
        return false;
    }
});
