
// Verkefni � Vefforritun2 HR - HTML5 Canvas  //
//  Nemendur:
//   Anton Sigur�sson - antons11@ru.is
//   Sigur�ur J�nsson - sigurdurjon11@ru.is
////////////////////////////////////////////////

////////////////////////////////////////////////
//  GLOBAL BREYTUR
////////////////////////////////////////////////

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

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

var mouseDown = false;
var mouseX = 0;
var mouseY = 0;
var mousedownX = 0;
var mousedownY = 0;
var kappa = 0.5522848;// Til a� h�gt s� a� gera elypsulaga hring
var isclean = false;

"use strict";
////////////////////////////////////////////////
//  GLOBAL F�LL
////////////////////////////////////////////////

//  Teiknar aftur �ll klasaeint�k � canvasinn.
function redraw() {
 context.clearRect(0, 0, 800, 400);
 
 for(var i = 0; i < shapeArraylength + 1; i++) {		
  shapeArray[i].draw(context);
 }
}

//  Tekur �t s��asta klasaeintaki� og vistar svo h�gt s� a� endurheimta.
//  Einnig endurheimtir undo hreinsa�an canvas.
function undo() {
 if(isclean){
  var temp = undoRedoArraylength;
  for(var i = 0; i < temp + 1; i++) {
   redo();
  }
 }
 else{
  if(shapeArraylength > -1) {
   undoRedoArray[undoRedoArraylength] = shapeArray[shapeArraylength];
   undoRedoArraylength++;
   shapeArraylength--;
   var shapeArray2 = [];
   for(var i = 0; i < shapeArraylength +1; i++) {
    shapeArray2[i] = shapeArray[i];
   }
   shapeArray = shapeArray2;
   redraw();
  }
 }
 isclean = false;
}

//  S�kir s��asta undo-a�a klasaeintak � canvasinn
function redo() {
 if(undoRedoArraylength > 0) {
  undoRedoArraylength--;
  shapeArraylength++;
  shapeArray[shapeArraylength] = undoRedoArray[undoRedoArraylength];
  redraw();
 }
}

//  Hreinsar canvasinn me� �v� a� setja �ll klasaeint�k � undo
function hreinsa() {
 var len = shapeArraylength;
 for (var i = 0; i < len +1; i++) {
  undo();			
 }
 isclean = true;
}

//  Til a� l�ta m�s virka r�tt � �llum v�frum
getMouse = function(e, canvas) {
 var element = canvas, offsetX = 0, offsetY = 0;
 if (element.offsetParent) {
  do{
   offsetX += element.offsetLeft;
   offsetY += element.offsetTop;
  } while ((element = element.offsetParent));
 }
 return {
  x: e.pageX - offsetX,
  y: e.pageY - offsetY
 };
}

//  Uppf�rir valinn lit fr� vefs��u
function selcol(c) {
 color = c;
}

//  Uppf�rir vali� form fr� vefs��u
function selform(newForm) {
 form = newForm;
}

//  Vistar �tlit canvasins og opnar � ��rum flipa
$('#buttonsave').click( function() {
 var thecanvase = document.getElementById('myCanvas');
 window.open(thecanvase.toDataURL('imge/png'));
});

//  Sendir inn mynd � canvasinn 
$('#submit').click(function() {
 var a = document.getElementById('inputbutton'),
 b = encodeURI(a.value),
 c = b.replace("C:%5Cfakepath%5C","");
 var uploadcanvas = document.getElementById('myCanvas');
 var uploadcontext = uploadcanvas.getContext('2d');
 var img = new Image()
 img.src = c
 uploadcontext.drawImage(img, 0, 0);
 if(a.value === "") {
  alert('No image selected, press "Choose File"/"Browse" to select an image!');
 }
});

//  S�kir �r checkboxi hvort teikna eigi fylltan hlut.
$('#check').click( function() {
 if(document.getElementById('check').checked) {
  fyllir = true;
 }
 else {
  fyllir = false;
 }
});

// Mousedown b�r til n�tt klasaeintak og sendir inn� smi�inn 
// gildum sem koma �r globalbreytum, st��u m�sar og af s��unni.
$('#myCanvas').mousedown(function (e) {
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

 shapeArray.push(newShape);
 mouseDown = true;
});

//  Mousemove falli� er eing�ngu virkt �egar mousedown er true.
//  �a� skrifar � klasaeint�kin endahnitin til a� h�gt s� 
//  a� teikna �au ��ur en m�s er sleppt.
$('#myCanvas').mousemove(function (e) {
 if(mouseDown) {
  var tempMouse = getMouse(e, canvas);
  mouseX = tempMouse.x;
  mouseY = tempMouse.y;
  shapeArray[shapeArraylength].endx = mouseX;
  shapeArray[shapeArraylength].endy = mouseY;
  if(form === 'brush') {
   shapeArray[shapeArraylength].hnitx.push(mouseX);
   shapeArray[shapeArraylength].hnity.push(mouseY);
  }
  if(form === 'circle') {
   shapeArray[shapeArraylength].savecircle();
  }
 redraw();
 }
});	

//  Mouseup vistar endam�sa gildin.
$('#myCanvas').mouseup(function (e) {
 var tempMouse = getMouse(e, canvas);
 mouseX = tempMouse.x;
 mouseY = tempMouse.y;
 mouseDown = false;
 shapeArray[shapeArraylength].endx = mouseX;
 shapeArray[shapeArraylength].endy = mouseY;
 shapeArray[shapeArraylength].draw(context);
});

//  Createshape returnar n�ju klasaeintaki af r�ttri sort
function createShapeClass(x, y, col, lw, sh, filled, fo, tex) {
 if(sh === 'brush') {
  return new Brush(x, y, col, lw, sh, filled);
 }
 else if(sh === 'line') {
  return new Line(x, y, col, lw, sh, filled);
 }
 else if(sh === 'square') {
  return new Square(x, y, col, lw, sh, filled);
 }
 else if(sh === 'circle') {
  return new Circle(x, y, col, lw, sh, filled);
 }
 else if(sh === 'triangle') {
  return new Triangle(x, y, col, lw, sh, filled);
 }
 else if(sh === 'text') {
  return new Texti(x, y, col, lw, sh, filled, fo, tex);
 }
}

////////////////////////////////////////////////
//  KLASAR 
////////////////////////////////////////////////

//  Shape er grunnklasinn sem a�rir klasar erfa fr�.
var Shape = Base.extend( {
 constructor: function(x, y, col, lineW, shapeName, filled) {
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

// Brush klasinn erfir fr� Shape klasanum og teiknar pensil.
var Brush = Shape.extend( {
 constructor: function(x, y, col, lineW, shapeName, filled) {
  this.base(x, y, col, lineW, shapeName, filled);
  this.hnitx = [];
  this.hnity = [];
  this.hnitx[0] = x;
  this.hnity[0] = y;
 },

 draw: function(ctx) {
  ctx.lineCap = "round";
  ctx.lineWidth = this.lineW;
  ctx.strokeStyle = this.col;
  for(var i = 0; i < this.hnitx.length; i++) {
   this.drawlines(this.hnitx[i], this.hnity[i], 
   this.hnitx[i+1], this.hnity[i+1]);
  }
 },

 drawlines: function(fx,fy,tx,ty) {
  context.beginPath();
  context.moveTo(fx,fy);
  context.lineTo(tx,ty);
  context.stroke();	
 }
});

//Square klasinn erfir fr� Shape klasanum og teiknar ferhyrning.
var Square = Shape.extend({
 constructor: function(x, y, col, lineW, shapeName, filled) {
  this.base(x, y, col, lineW, shapeName, filled);
 },

 draw: function(ctx) {
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
  if(ctx.filled) {
   ctx.fillStyle = this.col;
   ctx.fill();
  }
 }
});

//Line klasinn erfir fr� Shape klasanum og teiknar l�nu.
var Line = Shape.extend({
 constructor: function(x, y, col, lineW, shapeName, filled) {
  this.base(x, y, col, lineW, shapeName, filled);
 },

 draw: function(ctx) {
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

//Circle klasinn erfir fr� Shape klasanum og teiknar hring.
var Circle = Shape.extend({
 constructor: function(x, y, col, lineW, shapeName, filled) {
  this.base(x, y, col, lineW, shapeName, filled);
  this.width;
  this.height;
  this.ox;// horizontal offset
  this.oy;// vertical offset
  this.xm;// x mi�ja
  this.ym;// y mi�ja
 },

 draw: function(ctx) {
  ctx.lineWidth = this.lineW;
  ctx.strokeStyle = this.col;		
  ctx.beginPath();
  ctx.moveTo(this.x, this.ym);
  ctx.bezierCurveTo(this.x, this.ym - this.oy, this.xm - 
   this.ox, this.y, this.xm, this.y);
  ctx.bezierCurveTo(this.xm + this.ox, this.y, this.endx, 
   this.ym - this.oy, this.endx, this.ym);
  ctx.bezierCurveTo(this.endx, this.ym + this.oy, this.xm + 
   this.ox, this.endy, this.xm, this.endy);
  ctx.bezierCurveTo(this.xm - this.ox, this.endy, this.x, 
   this.ym + this.oy, this.x, this.ym);
  ctx.closePath();
  ctx.stroke();
  ctx.filled = this.filled;
  if(ctx.filled) {
   ctx.fillStyle = this.col;
   ctx.fill();
  }
 },

 savecircle: function() {
  this.width = this.endx - this.x;
  this.height = this.endy - this.y;
  this.ox = (this.width / 2) * kappa;
  this.oy = (this.height / 2) * kappa;
  this.xm = this.x + (this.width/2);
  this.ym = this.y + (this.height/2);
 }
});

// Text klasinn erfir fr� Shape klasanum og teiknar stafi.
var Texti = Shape.extend({
 constructor: function(x, y, col, lineW, shapeName, filled, fo, tex) {
  this.base(x, y, col, lineW, shapeName, filled)
 },

 draw: function(ctx) {
  ctx.fillStyle = this.col;
  ctx.font = (this.lineW*5)+ 'px ' + this.fo;
  ctx.fillText(this.tex, this.x, this.y);
 }
});

//  Triangle klasinn erfir fr� Shape klasanum og teiknar �r�hyrning.
var Triangle = Shape.extend({
 constructor: function(x, y, col, lineW, shapeName, filled) {
  this.base(x, y, col, lineW, shapeName, filled);
 },

 draw: function(ctx) {
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
  if(ctx.filled) {
   ctx.fillStyle = this.col;
   ctx.fill();
  }
 }
});