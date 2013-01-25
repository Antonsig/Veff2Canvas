	window.onload = function(){
		draw();
		selection('brush');
	}
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");


function selection(form){
	this.form = form;
	console.log(this.form + " chosen!");
}

function draw(){
	
	$("#myCanvas").mousedown(function(e){
		console.log("Í mousedown");
		var newShape = createShape(e.pageX+11, e.pageY+11);
	
		console.log(e.pageX + " " + e.pageY);
		
	});	
}

//RETURNES CHOSEN SHAPE 
function createShape(x, y){
		if(selection.form == "brush"){
			return new Brush(x,y);
		}
		else if(selection.form == "line"){
			return new Line(x,y);
		}
		else if(selection.form == "square"){
			return new Square(x,y);
		}
		else if(selection.form == "Circle"){
			return new Circle(x,y);
		}
		else if(selection.form == "triangle"){
			return new Triangle(x,y);
		}
		else{
			return new Brush(x,y);
		}
}	
//GRUNNKLASINN
var Shape = Base.extend({
	constructor: function(x,y){
		this.x = x;
		this.y = y;
	},
	
	test: function(){
		return "Í test";
	}
});

//BRUSH EKKI TILBÚINN
var Brush = Shape.extend({
	constructor: function(x,y){
	this.base(x,y);
	},
	
	draw : function(context){
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
		console.log("Í Brush.draw");
	}
	
});

// Í vinnslu
var Line = Shape.extend({
	constructor: function(x,y){
	this.base(x,y);
	},
	
	draw : function(context){

		console.log("In line");
	}
});

//EKKI BYRJAÐ
var Square = Shape.extend({
	constructor: function(x,y){
	this.base(x,y);
	},
	
	draw : function(context){
		drawtest(this.x, this.y);
		console.log("In Square");
	}
});

//EKKI BYRJAÐ
var Circle = Shape.extend({
	constructor: function(x,y){
	this.base(x,y);
	},
	
	draw : function(context){
		drawtest(this.x, this.y);
		console.log("In Circle");
	}
});

//EKKI BYRJAÐ
var Triangle = Shape.extend({
	constructor: function(x,y){
	this.base(x,y);
	},
	
	draw : function(context){
		drawtest(this.x, this.y);
		console.log("In Triangle");
	}
});


//Einfaldur teiknaður kassi
function drawtest(x,y){
	context.beginPath();
	context.moveTo(x,y);
	context.lineTo(x+20,y);
	context.lineTo(x+20,y+20);
	context.lineTo(x,y+20);
	context.closePath();
	context.stroke();
	context.fillStyle="rgba(255,255,255,1)";
	context.fill();

}


