window.onload = function(){
	draw();
}


function draw(){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
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
}