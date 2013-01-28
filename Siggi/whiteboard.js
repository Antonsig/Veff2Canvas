var currentColor = '#000';
var mouseX = 0;
var mouseY = 0;
var mousedownX = 0;
var mousedownY = 0;
var canvas = null;
var context = null;
var off = 0;
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
  off = $('#myCanvas').offset();

  $('#myCanvas').mousedown(function (e){
    mousedownX = e.pageX - off.left;
    mousedownY = e.pageY - off.top;

    freeDrawStart(mousedownX, mousedownY);
    mouseDown = true;
  });

  $('#myCanvas').mousemove(function (e){
    if(mouseDown){
      mouseX = e.pageX - off.left;
      mouseY = e.pageY - off.top;

      freeDrawEnd(mouseX + 1, mouseY + 1);
    }
  });
  $('#myCanvas').mouseup(function (e){
    mouseDown = false;
  });
});
