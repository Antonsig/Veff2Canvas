window.onload = function(){
	draw();
}


function draw(){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var shapechosen;

	function shape(x){
		shapechosen = x;
		console.log("Valið er: " + shapechosen);
	}


	$("#myCanvas").mousedown(function(e){
		var xd = e.pageX - this.offsetLeft;
		var yd = e.pageY - this.offsetTop;
		pencilstart( xd , yd );
		
		$("#myCanvas").mouseup(function(ee){
			var xu = ee.pageX - this.offsetLeft;
			var yu = ee.pageY - this.offsetTop;
			drawitem(xd, yd, xu, yu, shapechosen);
			console.log("Eftir mouseUp: " + shapechosen);
			pencilstop();
		});
	
	});

	function drawitem(xd,yd,xu,yu,shape){
		console.log(xd + " "+ yd + " " + xu + " " + " " + yu  + " " + shape);
		context.fillStyle="rgba(214, 36, 57, 1)";
		context.fillRect(xd,yd,20,20);

	}	
	
	function pencilstart( x , y ){
		context.beginpath();
		context.moveTo( x , y );
		context.drawing = true;
	}

	function pencilstop(){
		context.drawing = false;
	}
	
}

