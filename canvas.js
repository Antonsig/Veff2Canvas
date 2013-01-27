	window.onload = function(){
		drawing();
		selection('brush');
	}
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var shapeArray = [];
var arrayCounter = 0;
var redoshapeArray = [];
var redoarrayCounter = 0;
var form = "brush";

function drawAll(array, len){
	for(var i = 0; i<len; i++){
		shapeArray[i].draw(context);
		console.log(i);
	}
}

function undo(arr){
	redoshapeArray[redoarrayCounter] = shapeArray[arrayCounter];
	arr.splice(arrayCounter,1);
	redoarrayCounter++;
	arrayCounter--;
	context.clearRect(11, 11, canvas.width, canvas.height);
	drawAll(shapeArray,arrayCounter);
	console.log("í shapeArrayinu eru " + arrayCounter + " shape");
	console.log(" í redoArrayinu eru " + redoarrayCounter + " shape");
}

function redo(arr){
	
}

//Changes value of form variable
function selection(newForm){
	form = newForm;
	console.log(this.form + " chosen!");
}


function drawing(){
	
	$("#myCanvas").mousedown(function(e){
		var newShape = createShape(e.pageX+11, e.pageY+11);
		
		shapeArray[arrayCounter] = newShape;
		
		console.log(e.pageX + " " + e.pageY);
		shapeArray[arrayCounter].draw(context);
		arrayCounter++;
		console.log("Shapein eru: " + arrayCounter);
	});	
}

//RETURNES CHOSEN SHAPE 
function createShape(x, y){
		if(form === 'brush'){
			return new Brush(x,y);
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
	constructor: function(x,y){
		this.x = x;
		this.y = y;
	},
	
	test: function(){
		return "Í test";
	}
});

//BRUSH CLASS
var Brush = Shape.extend({
	constructor: function(x,y){
	this.base(x,y);
	},
	
	draw : function(context){
		var painting = true;
		context.beginPath();	

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

	}
	
});

// LINE CLASS
var Line = Shape.extend({
	constructor: function(x,y){
	this.base(x,y);
	},
	
	draw : function(context){
		context.beginPath();
		context.moveTo(this.x,this.y);
		
		console.log("In line");
		$("#myCanvas").mousemove(function(e){
		
			//Vantar að sýna línu preview!	
		});	

		$("#myCanvas").mouseup(function(e){
			mouseX = e.pageX - this.offsetLeft;
			mouseY = e.pageY - this.offsetTop;
			context.lineTo(mouseX, mouseY);
			context.stroke();
		});
	}
});

//EKKI BYRJAÐ
var Square = Shape.extend({
	constructor: function(x,y){
	this.base(x,y);

	},
	
	draw : function(context){
		context.beginPath();	
		context.moveTo(this.x,this.y);
		tempX = this.x;
		tempY = this.y;

		console.log("In Square");
		$("#myCanvas").mouseup(function(e){
			mouseX = e.pageX - this.offsetLeft;
			mouseY = e.pageY - this.offsetTop;
			context.rect(tempX, tempY, mouseX - tempX, mouseY - tempY);
			context.stroke();
		});

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


//Einfaldur teiknaður kassi - EYÐA Í LOKIN
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


