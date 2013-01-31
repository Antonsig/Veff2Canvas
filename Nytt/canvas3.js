var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var mouseDown = false;
var shapeArray = [];
var shapeArraylength = -1;
var form = "brush";
var color = "rgba(0,0,0,1)";
var lineWidth = 6;
var mouseX = 0;
var mouseY = 0;
var mousedownX = 0;
var mousedownY = 0;
var width;
var height;

function redraw(){
    context.clearRect(0,0,800,400);
    for(var i = 0; i < shapeArraylength + 1; i++){
        shapeArray[i].draw(context);
        console.log(shapeArray[i].x);
    }
}

//til að stilla af mús ef padding og border trufla
var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
	if (document.defaultView && document.defaultView.getComputedStyle) {
	stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
	stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
	styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
	styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
} 

//Leið til að láta mús virka bæði í firefox og chrome
getMouse = function(e, canvas) {
	var element = canvas, offsetX = 0, offsetY = 0;
	if (element.offsetParent) {
		do {
			offsetX += element.offsetLeft;
			offsetY += element.offsetTop;
		} while ((element = element.offsetParent));
	}

	// Add padding and border style widths to offset
	offsetX += stylePaddingLeft;
	offsetY += stylePaddingTop;
	offsetX += styleBorderLeft;
	offsetY += styleBorderTop;

	// We return an javascript object with x and y defined
	return {
		x: e.pageX - offsetX,
		y: e.pageY - offsetY
	};
}

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
		var current = shapeArray[shapeArraylength];
		var tempMouse = getMouse(e, canvas);
		mouseX = tempMouse.x;
		mouseY = tempMouse.y;
		width = (mouseX - mousedownX);
		height = (mouseY - mousedownY);
		var radius = (mouseX - mousedownX);
		if(form === 'brush'){
			current.draw(context);
			//console.log(current.x);
			//console.log(current.x + " " + current.y);
			//console.log("í mousemove if Brush");
			//freeDrawStart(mouseX,mouseY);
		}
		else if(form === 'line'){
			
		}
		else if(form ===  'square'){
			//console.log(width + " " + height + " " + mousedownX, + " " + mousedownY );
			
            current.draw(context);
		}
		else if(form ===  'circle'){
			current.draw(context);
		}
    }
});	

$('#myCanvas').mousedown(function (e){

	shapeArraylength++;		
	var tempMouse = getMouse(e, canvas);
	mousedownX = tempMouse.x;
	mousedownY = tempMouse.y;
	var newShape = createShapeClass(mousedownX, mousedownY, color, lineWidth, form);
    console.log("MX " + mousedownX + "| MY " + mousedownY + "| Color " + color + "| lineWidth " + lineWidth  + "| nameofShape " + form);
    //shapeArray[shapeArraylength] = newShape;
    console.log(newShape.shapeName);
	shapeArray.push(newShape);
	if(form === 'brush'){
		console.log(newShape.x);
		// console.log(mousedownX);
		// console.log(mousedownY);
		//shapeArray[shapeArraylength].draw(context);
		console.log(shapeArraylength);
	}
	if(form === 'line'){
		newShape.draw(mousedownX, mousedownY);
	}
	mouseDown = true;
});


$('#myCanvas').mouseup(function (e){	
	mouseDown = false;
    
});

function createShapeClass(x, y, col, lw, sh){
	if(form === 'brush'){
		
		var c = new Brush(x, y, col, lw, sh);
		console.log(c.x + " " + c.y );
		return c;

	}
	else if(form === 'line'){
		return new Line(x,y);
	}
	else if(form === 'square'){
		return new Square(x,y, col, lw, sh);
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
	constructor: function(x, y, col, lineW, shapeName){
		this.x = x;
		this.y = y;
        this.endx = x;
        this.endy = y;
		this.col = col;
		this.lineW = lineW;
        this.shapeName = shapeName;
	},
});

//Brush Class
var Brush = Shape.extend({
	constructor: function(x, y, col, lineW, shapeName){
		this.base(x, y, col, lineWidth, shapeName);
		//this.line = [];
	},

	draw: function(context){
		context.beginPath();	
		// context.strokeStyle = "rgba(0,0,0,1)";
		// context.lineWidth = 6;
		
		
		if(mouseDown){
			context.lineTo(mouseX, mouseY);
			context.stroke();
			//console.log("í draw!");
		}
	

	}
	
});

//Square Class
var Square = Shape.extend({
	constructor: function(x, y, color, lineWidth, shapeName){
		this.base(x, y, color, lineWidth, shapeName);
        
	},

	draw: function(ctx){
        
		ctx.beginPath();
		ctx.rect(mousedownX, mousedownY, width, height);
        this.endx = mouseDown + width;
        this.endy = mouseDown + height;
		ctx.fillStyle = this.col;
		ctx.closePath();
		ctx.fill();
	}
});