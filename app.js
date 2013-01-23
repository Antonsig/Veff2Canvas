window.onload = function(){
	draw();
}

var ShapeArr = [];

function draw(){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var painting = false;
	var lineThickness = 1;


}

var Shape = Base.extend({
	constructor: function(x,y,col,type,lineWidth){
		this.x = x;
		this.y = y;
		this.endX = x;
		this.endY = y;
		this.col = col;
		this.type = type;
		this.lineWidth = lineWidth;
	},
	// e-h föll


});

var Brush = new Shape.extend({
	constructor: function(x,y,col,w){
		this.base(x,y,col,"Brush",w);
	},
	draw: function(context){
		
	})

});

var Line = new Shape.extend({
	constructor: function(x,y,col,w){
		this.base(x,y,col,"Line",w);
	},
	draw: function(context){
		
	})

});

var Square = new Shape.extend({
	constructor: function(x,y,col,w){
		this.base(x,y,col,"Square",w);
	},
	draw: function(context){
		
	})

});

var Circle = new Shape.extend({
	constructor: function(x,y,col,w){
		this.base(x,y,col,"Circle",w);
	},
	draw: function(context){
		
	})

});

var Triangle = new Shape.extend({
	constructor: function(x,y,col,w){
		this.base(x,y,col,"Triangle",w);
	},
	draw: function(context){

		var painting = false;
		var lineThickness = 1;

		$("#myCanvas").mousedown(function(e){
			painting = true;
			context.beginPath();	
		});

		$("#myCanvas").mouseup(function(e){
			painting = false;

		});
		
		$("#myCanvas").mousemove(function(e){
			if (painting) {
				mouseX = e.pageX - this.offsetLeft;
				mouseY = e.pageY - this.offsetTop;
				context.lineTo(mouseX, mouseY);
				context.stroke();
			}
		});	
	})

});