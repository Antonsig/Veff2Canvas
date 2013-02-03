var color = '#000';
var tool = 'brush';
var linesize = 1;
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
  tool = 'brush';
});
$('#buttonbox').click( function(){
  tool = 'box';
});
$('#buttoncircle').click( function(){
  tool = 'circle';
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
$('#buttonclear').click( function(){
  context.clearRect(0, 0, 800, 700);
});
$('#buttonsave').click( function(){
  var thecanvase = document.getElementById('myCanvas');
  window.open(thecanvase.toDataURL('imge/png'));
});
$('#submit').click(function(){
  var a = document.getElementById('input'),
  b = encodeURI(a.value),
  c = b.replace("C:%5Cfakepath%5C","");
  var uploadcanvas = document.getElementById('myCanvas');
  var uploadcontext = uploadcanvas.getContext('2d');
  var img = new Image()
  img.src = c
  uploadcontext.drawImage(img,0,0);
  alert(c);
  if(a.value == ""){
    alert('No image selected, press "Choose File" to select an image!');
  }
});

function freeDrawStart(xpos, ypos){
  if(color == '#fff'){
    context.lineWidth = 6;
  }
  else{
    context.lineWidth = linesize;
  }
  context.strokeStyle = color;
  context.lineCap = 'round';
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
function canvasToImage() {
  var thecanvase = document.getElementById('myCanvas');
  window.open(thecanvase.toDataURL('imge/png'));
}

//-----------Meðan á keyrslu vefsíðu stendur--------------
$(document).ready(function(){
  getContext('myCanvas');
  off = $('#myCanvas').offset();

  $('#myCanvas').mousedown(function (e){
    mousedownX = e.pageX - off.left;
    mousedownY = e.pageY - off.top;

    if(tool == 'brush'){
      freeDrawStart(mousedownX, mousedownY);
    }
    mouseDown = true;
  });

  $('#myCanvas').mousemove(function (e){
    if(mouseDown){
      mouseX = e.pageX - off.left;
      mouseY = e.pageY - off.top;
      width = (mouseX - mousedownX);
      height = (mouseY - mousedownY);
      var radius = (mouseX - mousedownX);
      if(tool == 'brush'){
        freeDrawEnd(mouseX + 1, mouseY + 1);
      }
      else if(tool == 'box'){
        drawbox(mousedownX, mousedownY, width, height);
      }
      else if(tool == 'circle'){
        drawcircle(mousedownX, mousedownY, radius);
      }
    }
  });
  $('#myCanvas').mouseup(function (e){
    mouseDown = false;
  });
});
