

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var shapeArray = [];
var shapeArraylength = 0;
var redoArray = [];
var redoArraylenght = 0;
var form = "brush";
var color = "rgba(0,0,0,1)";
var linewidth;

function selcol(col){
	color = col;
	console.log(this.color + " chosen!");
}

function selform(newForm){
	form = newForm;
	console.log(this.form + " chosen!");
}

	$("#myCanvas").mousedown(function(e){
		var newShape = createShapeClass(e.pageX+11, e.pageY+11, color, linewidth);	
		newShape.draw(context);

		shapeArray[shapeArraylength] = newShape;
		shapeArraylength++;	
		console.log("Shapein eru: " + shapeArraylength);	
		// $("#myCanvas").mouseup(function(e){
			// var painting = false;
			// shapeArray[shapeArraylength] = newShape;
			// shapeArraylength++;	
			// console.log("Shapein eru: " + shapeArraylength);	
		// });
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
		console.log(selection.form);
		alert("Villa í Vali");
	}
}

//GRUNNKLASINN
var Shape = Base.extend({
	constructor: function(x,y,color,linewidth){
		this.x = x;
		this.y = y;
		this.color = color;
		this.linewidth = linewidth;
	},
});

//GRUNNKLASINN
var Brush = Base.extend({
	constructor: function(x, y, color, linewidth){
		this.base(x, y, color, linewidth);
		this.line = [];
	},

	draw: function(){
			var painting = true;
			var linesize = 0;
			context.beginPath();
			context.strokeStyle = color;
			
			$("#myCanvas").mouseup(function(e){
				painting = false;
			});			
			
			$("#myCanvas").mousemove(function(e){
				if (painting) {
					mouseX = e.pageX - this.offsetLeft;
					mouseY = e.pageY - this.offsetTop;

					context.lineTo(mouseX, mouseY);
					context.stroke();
					this.line[linesize] = ;
					linesize++;
				}
			});
			

			
		
	}
});