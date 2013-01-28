var currentColor = '#000';
var mouseX = 0;
var mouseY = 0;
var mousedownX = 0;
var mousedownY = 0;
var canvas = null;
var context = null;
var offset = 0;
var mouseDown = false;

function getContext(canvasId){
  canvas = document.getElementById(canvasId);
  context = canvas.getContext('2d');
}

$("#buttonblack").click( function(){
  currentColor = "#000";
});
$("#buttonred").click( function(){
  currentColor = "#f00";
});
$("#buttonblue").click( function(){
  currentColor = "#00f";
});
$("#buttongreen").click( function(){
  currentColor = "#0f0";
});
$("#buttonwhite").click( function(){
  currentColor = "#fff";
});

/*window.onload = function(){
  draw();
}*/

function freeDrawStart(xpos, ypos){
  context.strokeStyle = currentColor;
  context.lineCap = 'round';
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(xpos, ypos);
}

function freeDrawEnd(xpos,ypos){
  context.lineTo(xpos, ypos);
  context.stroke();
}

$(document).ready(function(){
  getContext('myCanvas');
  offset = $('#myCanvas').offset();

  $('#myCanvas').mousedown(function (e){
    mousedownX = e.pageX - offset.left;
    mousedownY = e.pageY - offset.top;

    freeDrawStart(mousedownX, mousedownY);
    mouseDown = true;
  });

  $('#myCanvas').mousemove(function (e){
    if(mouseDown){
      mouseX = e.pageX - offset.left;
      mouseY = e.pageY - offset.top;

      freeDrawEnd(mouseX + 1, mouseY + 1);
    }
  });
  $('#myCanvas').mouseup(function (e){
    mouseDown = false;
  });
});
/*function writeMessage(canvas, message) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
      }
      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
      var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');

      canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        writeMessage(canvas, message);
      }, false);

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
      context.strokeColor("red");
    }
  }); 
}*/