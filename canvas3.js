


var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var mouseDown = false;
var shapeArray = [];
var shapeArraylength = 0;
var redoArray = [];
var redoArraylenght = -1;
var form = "brush";
var color = "rgba(0,0,0,1)";
var lineWidth = 6;
var mouseX = 0;
var mouseY = 0;
var mousedownX = 0;
var mousedownY = 0;
var off = 0;

// function freeDrawStart(ctx, xpos, ypos, color, lineWidth){
	// context.strokeStyle = "rgba(0,0,0,1)";
	// context.lineWidth = 6;
	// context.beginPath();
	// context.moveTo(xpos, ypos);
	// mouseX = e.pageX - this.offsetLeft;
	// mouseY = e.pageY - this.offsetTop;
	// context.lineTo(mouseX, mouseY);
	// context.stroke();
	// console.log("Halló");
// }

function selcol(col){
	color = col;
	console.log(this.color + " chosen!");
}

function selform(newForm){
	form = newForm;
	console.log(this.form + " chosen!");
}


$('#myCanvas').mousemove(function (e){
	if(mouseDown){

		mouseX = e.pageX - off.left;
		mouseY = e.pageY - off.top;
		width = Math.abs(mouseX - mousedownX);
		height = Math.abs(mouseY - mousedownY);
		
		var radius = (mouseX - mousedownX);
		if(form === 'brush'){
			//shapeArray[shapeArraylength].draw(contextstate);
			//console.log("í mousemove if Brush");
			//freeDrawStart(mouseX,mouseY);
		}
		else if(form === 'line'){
			
		}
		else if(form ===  'box'){
			drawbox(mousedownX, mousedownY, width, height);
		}
		else if(form ===  'circle'){
			drawcircle(mousedownX, mousedownY, radius);
		}
    }
});	
	$('#myCanvas').mousedown(function (e){
		mouseDown = true;
		shapeArraylength++;		
		mousedownX = e.pageX - off.left;
		mousedownY = e.pageY - off.top;
		var newShape = createShapeClass(e.pageX+11, e.pageY+11, color, lineWidth);	
		shapeArray[shapeArraylength] = newShape;
		contextstate = context;
		if(form === 'brush'){
			if(mousemove === true){
				shapeArray[shapeArraylength].draw(context);			
			}

			console.log(shapeArraylength);
		}
		if(form === 'line'){
			newShape.draw(mousedownX, mousedownY);
		}


	});


$('#myCanvas').mouseup(function (e){	
	mouseDown = false;
	mousemove = false;
});

function createShapeClass(x, y, color, linewidth){
	if(form === 'brush'){
		return new Brush(x, y, color, linewidth);
	}
	else if(form === 'line'){
		return new Line(x,y);
	}
	else if(form === 'square'){
		return new Square(x,y);
	}
	else if(form === 'circle'){
		return new Circle(x,y);
	}
	else if(form === 'triangle'){
		return new Triangle(x,y);
	}
	else{
		alert("Villa í Vali");
	}
}

//GRUNNKLASINN
var Shape = Base.extend({
	constructor: function(x,y,color,lineWidth){
		this.x = x;
		this.y = y;
		this.color = color;
		this.lineWidth = lineWidth;
	},
});

//GRUNNKLASINN
var Brush = Base.extend({
	constructor: function(x, y, color, lineWidth){
		this.base(x, y, color, lineWidth);
		this.line = [];
	},

	draw: function(context){
		context.beginPath();	
		//context.strokeStyle = "rgba(0,0,0,1)";
		//context.lineWidth = 6;
		console.log(context.color);

		
		if(mouseDown){
			context.lineTo(x,y);
			context.stroke();
			console.log("í draw!");
		}
	

	
		// mouseX = e.pageX - this.offsetLeft;
		// mouseY = e.pageY - this.offsetTop;
		// freeDrawStart(ctx, mouseX, mouseY, color, lineWidth);
		
		// context.strokeStyle = color;
		// context.lineCap = 'round';
		// context.lineWidth = this.lineWidth;
		// context.beginPath();
		// context.moveTo(mouseX, mouseY);
	},
	
});