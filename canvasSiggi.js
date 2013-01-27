var currentColor = '#000';
var mouseX = 0;
var mouseY = 0;
var mousedownX = 0;
var mousedownY = 0;
var canvas = null;
var context = null;
var offset = 0;

function getContext(canvasId){
canvas = document.getElementById(canvasId);
context = canvas.getContext('2d');
}
function freeDrawStart(xpos, ypos){
context.strokeColor = currentColor;
context.lineWidth = 1;
context.beginPath();
context.moveTo(xpos, ypos);
}

function freeDrawEnd(xpos,ypos){
context.lineTo(xpos, ypos);
context.stoke();
}

$(document).ready(function(){
getContext('myCanvas');
offset = $('#myCanvas').offset();

$('#myCanvas').mousedown(function (e){
mousedownX = e.pageX - offset.left;
mousedownY = e.pageY - offset.top;

freeDrawStart(mousedownX, mousedownY);
});

$('#myCanvas').mousemove(function (e){
//if(mousedown){
mouseX = e.pageX - offset.left;
mouseY = e.pageY - offset.top;

freeDrawEnd(mouseX, mouseY);
//}
});
});