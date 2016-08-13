var X = {
	version: "1.3",
	canvas2D: document.createElement("canvas"),
	context2D: null
};

X.context2D = X.canvas2D.getContext("2d");


/*
**********************
	class Stage
**********************
*/

X.Stage = function(container, width, height) {
	this.displayList = []; //array of display objects
	this.width = width;
	this.height = height; 
	X.canvas2D.width = width;
	X.canvas2D.height = height;
	
	if(container == null)
	{
		document.body.appendChild(X.canvas2D);
	}
	else
	{
		container.appendChild(X.canvas2D);
	}
};

X.Stage.prototype = {
	constructor: X.Stage,
	add: function(displayObject) { // everytime to you call this method object is draw automatically so every display object must implement draw method
		this.displayList.push(displayObject);
		displayObject.draw();
	},
	clear: function() {
		this.setComposite("source-over");
		X.context2D.clearRect(0, 0, this.width, this.height);
	},
	clearFill: function(style) {
		this.setComposite("source-over");
		X.context2D.fillStyle = style;
		X.context2D.fillRect(0, 0, this.width, this.height);
	},	
	setComposite: function(option) {
		X.context2D.globalCompositeOperation = option;
	}
};


/*
**************************
	class DisplayObject
*************************
*/
//the parent of all display objects
X.DisplayObject = function() {
	this.x = 0;
	this.y = 0;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.skewX = 0;
	this.skewY = 0;
	this.alpha = 1;
};	

X.DisplayObject.prototype = {
	constructor: X.DisplayObject,
	resetTransform: function() {
		X.context2D.setTransform(1, 0, 0, 1, 0, 0);		
	},
	transform: function() {
		X.context2D.transform(this.scaleX, 
							  this.skewY, 
							  this.skewX, 
							  this.scaleY, 
							  this.x, //translate
							  this.y //translate
							 );				
	},
	draw: null // all display object sub class should implement draw method
};


/*
*************************
	class FillRectangle
*************************
*/
X.FillRectangle = function(style, x, y, width, height) {
	X.DisplayObject.call(this);
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.style = style;
};

X.FillRectangle.prototype = Object.create(X.DisplayObject.prototype);
X.FillRectangle.prototype.constructor = X.FillRectangle;
X.FillRectangle.prototype.draw = function() {
	
	X.context2D.globalAlpha = this.alpha;

	this.transform();
	X.context2D.rotate(this.rotation);
	X.context2D.fillStyle = this.style;
	X.context2D.fillRect(0-this.width * this.scaleX /2, 
						 0-this.height * this.scaleY / 2, 
						 this.width * this.scaleX, 
						 this.height * this.scaleY
					    );	
	this.resetTransform();
	
	X.context2D.globalAlpha = 1;
};


/*
***************************
	class StrokeRectangle
***************************
*/
X.StrokeRectangle = function(style, x, y, width, height) {
	X.DisplayObject.call(this);
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.style = style;
	this.lineWidth = 1;
};

X.StrokeRectangle.prototype = Object.create(X.DisplayObject.prototype);
X.StrokeRectangle.prototype.constructor = X.StrokeRectangle;
X.StrokeRectangle.prototype.draw = function() {

	this.transform();
	X.context2D.rotate(this.rotation);
	X.context2D.strokeStyle = this.style;
	X.context2D.lineWidth = this.lineWidth;
	X.context2D.strokeRect(0-this.width * this.scaleX /2, 
						   0-this.height * this.scaleY / 2, 
						   this.width * this.scaleX, 
						   this.height * this.scaleY
						   );	
	this.resetTransform();
	
};


/*
**********************
	class FillOval
**********************
*/

X.FillOval = function(style, x, y, radius) {
	X.DisplayObject.call(this);
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.style = style;
};

X.FillOval.prototype = Object.create(X.DisplayObject.prototype);
X.FillOval.prototype.constructor = X.FillOval;
X.FillOval.prototype.draw = function() {
	this.transform();
	X.context2D.rotate(this.rotation);
	X.context2D.fillStyle = this.style;
	X.context2D.beginPath();
	X.context2D.arc(0, 0, this.radius, 0, Math.PI * 2, false);
	X.context2D.closePath();
	X.context2D.fill();
	this.resetTransform();
};


/*
**********************
	class StrokeOval
**********************
*/
X.StrokeOval = function(style, x, y, radius, lineWidth) {
	X.DisplayObject.call(this);
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.style = style;
	this.lineWidth = lineWidth;
};

X.StrokeOval.prototype = Object.create(X.DisplayObject.prototype);
X.StrokeOval.prototype.constructor = X.StrokeOval;
X.StrokeOval.prototype.draw = function() {
	this.transform();
	X.context2D.rotate(this.rotation);
	X.context2D.strokeStyle = this.style;
	X.context2D.lineWidth = this.lineWidth;
	X.context2D.beginPath();
	X.context2D.arc(0, 0, this.radius, 0, Math.PI * 2, false);
	X.context2D.closePath();
	X.context2D.stroke();
	this.resetTransform();
};











