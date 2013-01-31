var color = '#000';
var currentTool = 'brush';
var mouseX = 0;
var mouseY = 0;
var mousedownX = 0;
var mousedownY = 0;
var width = 0;
var height = 0;
var canvas = null;
var context = null;
var off = 0;
var mouseDown = false;

function getContext(canvasId){
  canvas = document.getElementById(canvasId);
  context = canvas.getContext('2d');
}
$('#buttonbrush').click( function(){
  currentTool = 'brush';
});
$('#buttonbox').click( function(){
  currentTool = 'box';
});
$('#buttoncircle').click( function(){
  currentTool = 'circle';
});
$('#buttonblack').click( function(){
  color = '#000';
});
$('#buttonred').click( function(){
  color = '#f00';
});
$('#buttonblue').click( function(){
  color = '#00f';
});
$("#buttongreen").click( function(){
  color = '#0f0';
});
$('#buttonwhite').click( function(){
  color = '#fff';
});

function freeDrawStart(xpos, ypos){
  context.strokeStyle = color;
  context.lineCap = 'round';
  context.lineWidth = 6;
  context.beginPath();
  context.moveTo(xpos, ypos);
}
function freeDrawEnd(xpos,ypos){
  context.lineTo(xpos, ypos);
  context.stroke();
}
function drawbox(mousedownX, mousedownY, width, height){
  context.beginPath();
  context.rect(mousedownX, mousedownY, width, height);
  context.fillStyle = color;
  context.closePath();
  context.fill();
}
function drawcircle(mousedownX, mousedownY, radius){
  context.beginPath();
  context.fillStyle = color;
  context.arc(mousedownX, mousedownY, radius, 0, Math.PI *2, true);
  context.closePath();
  context.fill();
}

//-----------Meðan á keyrslu vefsíðu stendur--------------
$(document).ready(function(){
  getContext('myCanvas');
  off = $('#myCanvas').offset();

  $('#myCanvas').mousedown(function (e){
    mousedownX = e.pageX - off.left;
    mousedownY = e.pageY - off.top;

    if(currentTool == 'brush'){
      freeDrawStart(mousedownX, mousedownY);
    }
    mouseDown = true;
  });

  $('#myCanvas').mousemove(function (e){
    if(mouseDown){
      mouseX = e.pageX - off.left;
      mouseY = e.pageY - off.top;
      width = Math.abs(mouseX - mousedownX);
      height = Math.abs(mouseY - mousedownY);
      var radius = (mouseX - mousedownX);
      if(currentTool == 'brush'){
        freeDrawEnd(mouseX + 1, mouseY + 1);
      }
      else if(currentTool == 'box'){
        drawbox(mousedownX, mousedownY, width, height);
      }
      else if(currentTool == 'circle'){
        drawcircle(mousedownX, mousedownY, radius);
      }
    }
  });
  $('#myCanvas').mouseup(function (e){
    mouseDown = false;
  });
});
