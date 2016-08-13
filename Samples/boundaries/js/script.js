(function(w) {

	function Circle(x, y, rad, className, sx, sy) {
	
		this.x = x;
		this.y = y;
		this.sx = sx;
		this.sy = sy;
		this.rad = rad;
		this.className = className;
		this.domElement = document.createElement("div");
		
		this.domElement.className = this.className;
		this.domElement.style.width = this.rad + "px";
		this.domElement.style.height = this.rad + "px";
		this.domElement.style.marginLeft = (-this.rad / 2) + "px";
		this.domElement.style.marginTop = (-this.rad / 2) + "px";
		
		this.applyTransform();
		
	}
	
	Circle.prototype = {
		applyTransform: function() {
			var transformString = "translate(" + this.x + "px, " + this.y + "px)";
			this.domElement.style.webkitTransform = transformString;
			this.domElement.style.MozTransform = transformString;
		}
	};
	
	function animate() {
	
		requestAnimationFrame(animate);
		
		for(var i = 0, len = circles.length; i < len; i++) {
			
			var circle = circles[i];
						
			circle.sx += Math.random() * 1 - 0.5;
			circle.sy += Math.random() * 1 - 0.5;
			
			circle.x += circle.sx;
			circle.y += circle.sy;
			
			if(circle.sx > 5 || circle.sy < -5)  {
				circle.sx *= 0.5;
			}
			
			if(circle.sy > 5 || circle.sy < -5) {
				circle.sy *= 0.5;
			}
			
			if(circle.x > mainContainer.width || circle.x < 0) {
				circle.sx *= -1;
			}
			
			if(circle.y > mainContainer.height || circle.y < 0) {
				circle.sy *= -1;
			}
			
			circle.applyTransform();
		}
	}
	
	var mainContainer = {
		domElement: document.getElementById("main-container"),
		width: w.innerWidth,
		height: w.innerHeight
	},
	MAX_CIRCLE = 10,
	classes = ["circle", "circle1", "circle2", "circle3", "circle4"],
	circles = [];
	
	mainContainer.domElement.style.width = mainContainer.width + "px";
	mainContainer.domElement.style.height = mainContainer.height + "px";
	
	for(var i = 0; i < MAX_CIRCLE; i++) {
	
		var circle = new Circle(
					mainContainer.width / 2,
					mainContainer.height / 2,
					10 + Math.random() * 20 , 
					classes[Math.floor(Math.random() * classes.length)],
					Math.random() * 2 - 1,
					Math.random() * 2 - 1
				);
				
		mainContainer.domElement.appendChild(circle.domElement);	
		circles.push(circle);
		
	}
	
	animate();
	
})(window);