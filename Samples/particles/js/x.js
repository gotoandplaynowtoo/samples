var X = {
	VERSION:"1.1"
};

X.CanvasRenderer = function() {
	this.canvas2D = document.createElement("canvas");
	this.canvas2DContext = this.canvas2D.getContext("2d");
	
	this.bufferedCanvas2D = document.createElement("canvas");
	this.bufferedCanvas2DContext = this.bufferedCanvas2D.getContext("2d");	
};

X.Scene = function() {
	this.displayObjects = [];
	this.width = 0;
	this.height = 0;
};

X.Scene.prototype = {
	constructor: X.Scene,
	add: function(displayObject) {
		displayObject.draw();
		this.displayObjects.push(displayObject);
	},
	render: function() {
		X.Renderer.canvas2DContext.drawImage(X.Renderer.bufferedCanvas2D, 0, 0);
	},
	setCompositeOperation: function(operation) {
		X.Renderer.bufferedCanvas2DContext.globalCompositeOperation = operation;
	},
	setRenderer: function(renderer) {
		X.Renderer = renderer;
	},
	
	setSize: function(width, height) {
		X.Renderer.canvas2D.width = width;
		X.Renderer.canvas2D.height = height;
		X.Renderer.bufferedCanvas2D.width = width;
		X.Renderer.bufferedCanvas2D.height = height;		
		
		this.width = width;
		this.height = height;
	},
	
	getCanvas: function() {
		return X.Renderer.canvas2D;
	},
	
	clear: function() {
		X.Renderer.canvas2DContext.clearRect(0, 0, this.width, this.height);
		X.Renderer.bufferedCanvas2DContext.clearRect(0, 0, this.width, this.height);
	},
	
	clearFill: function(fStyle) {
		this.setCompositeOperation("source-over");
		X.Renderer.bufferedCanvas2DContext.fillStyle = fStyle;
		X.Renderer.bufferedCanvas2DContext.fillRect(0, 0, this.width, this.height);
	}
};

X.DisplayObject = function() {
	this.x = 0;
	this.y = 0;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.skewX = 0;
	this.skewY = 0;
};

X.DisplayObject.prototype = {
	constructor: X.DisplayObject,
	resetTransform: function() {
		X.Renderer.bufferedCanvas2DContext.setTransform(1, 0, 0, 1, 0, 0);		
	},
	transform: function() {
		X.Renderer.bufferedCanvas2DContext.transform(this.scaleX, 
													 this.skewY, 
													 this.skewX, 
													 this.scaleY, 
													 this.x, //translate
													 this.y //translate
													);				
	},
};

X.FillRectangle = function(rectStyle, x, y, width, height) {
	X.DisplayObject.call(this);
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.rectStyle = rectStyle;
};

X.FillRectangle.prototype = Object.create(X.DisplayObject.prototype);
X.FillRectangle.prototype.constructor = X.FillRectangle;
X.FillRectangle.prototype.draw = function() {

	this.transform();
	X.Renderer.bufferedCanvas2DContext.rotate(this.rotation);
	X.Renderer.bufferedCanvas2DContext.fillStyle = this.rectStyle;
	X.Renderer.bufferedCanvas2DContext.fillRect(0-this.width * this.scaleX /2, 
												0-this.height * this.scaleY / 2, 
												this.width * this.scaleX, 
												this.height * this.scaleY
												);	
	this.resetTransform();
};

X.StrokeRectangle = function(rectStyle, x, y, width, height) {
	X.DisplayObject.call(this);
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.rectStyle = rectStyle;
	this.lineW = 1;
};

X.StrokeRectangle.prototype = Object.create(X.DisplayObject.prototype);
X.StrokeRectangle.prototype.constructor = X.StrokeRectangle;
X.StrokeRectangle.prototype.draw = function() {

	this.transform();
	X.Renderer.bufferedCanvas2DContext.rotate(this.rotation);
	X.Renderer.bufferedCanvas2DContext.strokeStyle = this.rectStyle;
	X.Renderer.bufferedCanvas2DContext.strokeRect(0-this.width * this.scaleX /2, 
												  0-this.height * this.scaleY / 2, 
												  this.width * this.scaleX, 
												  this.height * this.scaleY
												 );	
	this.resetTransform();
	
};

X.FillOval = function(ovalStyle, x, y, radius) {
	X.DisplayObject.call(this);
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.ovalStyle = ovalStyle;
};

X.FillOval.prototype = Object.create(X.DisplayObject.prototype);
X.FillOval.prototype.constructor = X.FillOval;
X.FillOval.prototype.draw = function() {
	this.transform();
	X.Renderer.bufferedCanvas2DContext.rotate(this.rotation);
	X.Renderer.bufferedCanvas2DContext.fillStyle = this.ovalStyle;
	X.Renderer.bufferedCanvas2DContext.beginPath();
	X.Renderer.bufferedCanvas2DContext.arc(0, 0, this.radius, 0, Math.PI * 2, false);
	X.Renderer.bufferedCanvas2DContext.closePath();
	X.Renderer.bufferedCanvas2DContext.fill();
	this.resetTransform();
};



X.StrokeOval = function(ovalStyle, x, y, radius, lineW) {
	X.DisplayObject.call(this);
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.ovalStyle = ovalStyle;
	this.lineW = lineW;
};

X.StrokeOval.prototype = Object.create(X.DisplayObject.prototype);
X.StrokeOval.prototype.constructor = X.StrokeOval;
X.StrokeOval.prototype.draw = function() {
	this.transform();
	X.Renderer.bufferedCanvas2DContext.rotate(this.rotation);
	X.Renderer.bufferedCanvas2DContext.strokeStyle = this.ovalStyle;
	X.Renderer.bufferedCanvas2DContext.lineWidth = this.lineW;
	X.Renderer.bufferedCanvas2DContext.beginPath();
	X.Renderer.bufferedCanvas2DContext.arc(0, 0, this.radius, 0, Math.PI * 2, false);
	X.Renderer.bufferedCanvas2DContext.closePath();
	X.Renderer.bufferedCanvas2DContext.stroke();
	this.resetTransform();
};


/*
	DisplayImage class
*/

X.DisplayImage = function(img, x, y) {
	X.DisplayObject.call(this);
	this.img = img;
	this.x = x;
	this.y = y;
	this.alpha = 1;
};

X.DisplayImage.prototype = Object.create(X.DisplayObject.prototype);
X.DisplayImage.prototype.constructor = X.DisplayImage;
X.DisplayImage.prototype.draw = function() {
	X.Renderer.bufferedCanvas2DContext.globalAlpha = this.alpha;
	this.transform();
	X.Renderer.bufferedCanvas2DContext.rotate(this.rotation);
	X.Renderer.bufferedCanvas2DContext.drawImage(this.img, 0-this.img.width/2, 0-this.img.height/2);
	this.resetTransform();
	X.Renderer.bufferedCanvas2DContext.globalAlpha = 1;
};



X.Particle = function(img, x, y) {
	X.DisplayImage.call(this, img, x, y);
	this.vx = 0;
	this.vy = 0;
	this.alpha = 1;
};

X.Particle.prototype = Object.create(X.DisplayImage.prototype);
X.Particle.prototype.constructor = X.Particle;




/*
	Color class
*/


X.Color = function(r, g, b, a) {
	this.red = r;
	this.green = g;
	this.blue = b;
	this.alpha = a;
	this.brightness = 0;
};

X.Color.prototype = {
	constructor: X.Color,
	setBrightness: function(brightness) { // 0 - 1.0
		this.brightness = brightness;
		this.red += Math.floor((255 - this.red) * brightness);
		this.green += Math.floor((255 - this.green) * brightness);
		this.blue += Math.floor((255 - this.blue) * brightness);
		
	},
	getRGBAString: function() {
		return "rgba(" + this.red + ", " + 
					   + this.green + ", " +
					   + this.blue + ", " + 
					   + this.alpha + ")";
	}
};






