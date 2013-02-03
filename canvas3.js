var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var mouseDown = false;
var shapeArray = [];
var undoRedoArray = [];
var shapeArraylength = -1;
var undoRedoArraylength = 0;
var form = "brush";
var color = "rgba(0,0,0,1)";
var fyllir = false;
var fontur = 'arial';
var texti = '';
var lineWidth = 6;
var mouseX = 0;
var mouseY = 0;
var mousedownX = 0;
var mousedownY = 0;
var kappa = .5522848; // Fyrir circle

function redraw(){
    context.clearRect(0,0,800,400);
	
    for(var i = 0; i < shapeArraylength + 1; i++){		
        shapeArray[i].draw(context);
        console.log(shapeArray[i].x + " " + shapeArray[i].y + " " + shapeArray[i].endx + " " + shapeArray[i].endy + " " + shapeArray[i].lineW + " " + shapeArray[i].col + " " + shapeArray[i].shapeName);
    }
}

function undo(){
	if(shapeArraylength > -1){
		undoRedoArray[undoRedoArraylength] = shapeArray[shapeArraylength];
		undoRedoArraylength++;
		shapeArraylength--;
		redraw();
	}
}

function redo(){
	if(undoRedoArraylength > 0){
		undoRedoArraylength--;
		shapeArraylength++;
		shapeArray[shapeArraylength] = undoRedoArray[undoRedoArraylength];
		redraw();
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

function selcol(c){
	color = c;
}

function selform(newForm){
	form = newForm;
}

$('#buttonsave').click( function(){
  var thecanvase = document.getElementById('myCanvas');
  window.open(thecanvase.toDataURL('imge/png'));
});

$('#submit').click(function(){
  var a = document.getElementById('inputbutton'),
  b = encodeURI(a.value),
  c = b.replace("C:%5Cfakepath%5C","");
  var uploadcanvas = document.getElementById('myCanvas');
  var uploadcontext = uploadcanvas.getContext('2d');
  var img = new Image()
  img.src = c
  uploadcontext.drawImage(img,0,0);
  if(a.value === ""){
    alert('No image selected, press "Choose File" to select an image!');
  }
});

$('#check').click( function(){
 if(document.getElementById('check').checked){
 		fyllir = true;
 	}
 	else{
 		fyllir = false;
 	}
 });

$('#myCanvas').mousemove(function (e){
	if(mouseDown){
		var tempMouse = getMouse(e, canvas);
		mouseX = tempMouse.x;
		mouseY = tempMouse.y;
		shapeArray[shapeArraylength].endx = mouseX;
		shapeArray[shapeArraylength].endy = mouseY;
		if(form === 'brush'){
			shapeArray[shapeArraylength].hnitx.push(mouseX);
			shapeArray[shapeArraylength].hnity.push(mouseY);
		}
		if(form === 'circle'){
			shapeArray[shapeArraylength].savecircle();
		}
		
		redraw();
    }
});	

$('#myCanvas').mousedown(function (e){
	if(undoRedoArraylength > 0){
		undoRedoArraylength = 0;
	}

	shapeArraylength++;		
	var tempMouse = getMouse(e, canvas);
	mousedownX = tempMouse.x;
	mousedownY = tempMouse.y;
	lineWidth = document.getElementById('linewidth').value;
	fontur = document.getElementById('fontval').value;
	texti = document.getElementById('textareitur').value;
	var newShape = createShapeClass(mousedownX, mousedownY, color, lineWidth, form, fyllir, fontur, texti);
    console.log("MX " + mousedownX + "| MY " + mousedownY + "| Color " + color + "| lineWidth " + lineWidth  + "| nameofShape " + form + "| Filled " + fyllir);
    console.log(newShape.shapeName);
	shapeArray.push(newShape);
	mouseDown = true;
});


$('#myCanvas').mouseup(function (e){	
	mouseDown = false;
	var tempMouse = getMouse(e, canvas);
	mouseX = tempMouse.x;
	mouseY = tempMouse.y;
	shapeArray[shapeArraylength].endx = mouseX;
	shapeArray[shapeArraylength].endy = mouseY;
	shapeArray[shapeArraylength].draw(context);
});

function createShapeClass(x, y, col, lw, sh, filled, fo, tex){
	if(sh === 'brush'){
		return new Brush(x, y, col, lw, sh, filled);
	}
	else if(sh === 'line'){
		return new Line(x, y, col, lw, sh, filled);
	}
	else if(sh === 'square'){
		return new Square(x, y, col, lw, sh, filled);
	}
	else if(sh === 'circle'){
		return new Circle(x, y, col, lw, sh, filled);
	}
	else if(sh === 'triangle'){
		return new Triangle(x, y, col, lw, sh, filled);
	}
	else if(sh === 'text'){
		return new Texti(x, y, col, lw, sh, filled, fo, tex);
	}
}

//GRUNNKLASINN
var Shape = Base.extend({
	constructor: function(x, y, col, lineW, shapeName, filled){
		this.x = x;
		this.y = y;
        this.endx = x;
        this.endy = y;
		this.col = col;
		this.lineW = lineW;
        this.shapeName = shapeName;
        this.filled = filled;
        this.fo = fontur;
        this.tex = texti;
	},
});

//Brush Class
var Brush = Shape.extend({
	constructor: function(x, y, col, lineW, shapeName, filled){
		this.base(x, y, col, lineW, shapeName, filled);
		this.hnitx = [];
		this.hnity = [];
		this.hnitx[0] = x;
		this.hnity[0] = y;
	},

	draw: function(ctx){
		ctx.lineWidth = this.lineW;
		ctx.strokeStyle = this.col;

		for(var i = 0; i < this.hnitx.length; i++){
			this.drawlines(this.hnitx[i], this.hnity[i], this.hnitx[i+1], this.hnity[i+1]);
			console.log(i + " " + this.hnitx[i]);
		}
	},

	drawlines: function(fx,fy,tx,ty){
		context.beginPath();
		context.moveTo(fx,fy);
		context.lineTo(tx,ty);
		//context.closePath();
		context.stroke();	
	}
	
});

//Square Class
var Square = Shape.extend({
	constructor: function(x, y, col, lineW, shapeName, filled){
		this.base(x, y, col, lineW, shapeName, filled);
        
	},

	draw: function(ctx){
		ctx.filled = this.filled;
        ctx.x = this.x;
		ctx.y = this.y;
		ctx.strokeStyle = this.col;
		ctx.lineWidth = this.lineW;
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x, this.endy);
		ctx.lineTo(this.endx, this.endy);
		ctx.lineTo(this.endx, this.y);
		ctx.closePath();
		ctx.stroke();
		if(ctx.filled){
			ctx.fillStyle = this.col;
			ctx.fill();
		}	
	}
});

//Line Class
var Line = Shape.extend({
	constructor: function(x, y, col, lineW, shapeName, filled){
		this.base(x, y, col, lineW, shapeName, filled);
	},

	draw: function(ctx){
        ctx.x = this.x;
		ctx.y = this.y;
		ctx.lineWidth = this.lineW;
		ctx.strokeStyle = this.col;
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.endx, this.endy);
		ctx.closePath();
		ctx.stroke();
	}
});

//Circle Class
var Circle = Shape.extend({
	constructor: function(x, y, col, lineW, shapeName, filled){
		this.base(x, y, col, lineW, shapeName, filled);
		this.width;
		this.height;
		this.ox;	// horizontal offset
		this.oy;	// vertical offset
		this.xm;	// x middle
		this.ym;	// y middle
		
	},

	draw: function(ctx){
		ctx.lineWidth = this.lineW;
		ctx.strokeStyle = this.col;		
		ctx.beginPath();
		ctx.moveTo(this.x, this.ym);
		ctx.bezierCurveTo(this.x, this.ym - this.oy, this.xm - this.ox, this.y, this.xm, this.y);
		ctx.bezierCurveTo(this.xm + this.ox, this.y, this.endx, this.ym - this.oy, this.endx, this.ym);
		ctx.bezierCurveTo(this.endx, this.ym + this.oy, this.xm + this.ox, this.endy, this.xm, this.endy);
		ctx.bezierCurveTo(this.xm - this.ox, this.endy, this.x, this.ym + this.oy, this.x, this.ym);
		ctx.closePath();
		ctx.stroke();
		ctx.filled = this.filled;
		if(ctx.filled){
			ctx.fillStyle = this.col;
			ctx.fill();
		}		
	},
	
	savecircle: function(){
		this.width = this.endx - this.x;
		this.height = this.endy - this.y;
		this.ox = (this.width / 2) * kappa;
		this.oy = (this.height / 2) * kappa;
		this.xm = this.x + (this.width/2);
		this.ym = this.y + (this.height/2);
	}
});

//Text Class
var Texti = Shape.extend({
	constructor: function(x, y, col, lineW, shapeName, filled, fo, tex){
		this.base(x, y, col, lineW, shapeName, filled)
	},

	draw: function(ctx){
		ctx.fillStyle = this.col;
  		ctx.font = (this.lineW*5)+ 'px ' + this.fo;
  		ctx.fillText(this.tex, this.x, this.y);
	}
});

//Triangle Class
var Triangle = Shape.extend({
	constructor: function(x, y, col, lineW, shapeName, filled){
		this.base(x, y, col, lineW, shapeName, filled);
	},

	draw: function(ctx){
		ctx.filled = this.filled;
        ctx.x = this.x;
		ctx.y = this.y;
		ctx.strokeStyle = this.col;
		ctx.lineWidth = this.lineW;
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.endx, this.endy);
		ctx.lineTo(this.x - (this.endx - this.x), this.endy);
		ctx.closePath();
		ctx.stroke();
		if(ctx.filled){
			ctx.fillStyle = this.col;
			ctx.fill();
		}	
	}
});