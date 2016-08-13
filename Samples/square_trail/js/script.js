(function(w) {

	function Square(x, y) {
		this.x = x;
		this.y = y;
		this.opacity = 1;
		this.size = 100;
		this.scale = 0;
		this.domElement = w.document.createElement("div");
		this.domElement.className = "square";
		this.domElement.style.opacity = this.opacity;
		this.domElement.style.width = this.size + "px";
		this.domElement.style.height = this.size + "px";
	}
	
	Square.prototype = {
		applyTransform: function() {
		
			var tranformString = "translate3d(" + (this.x - this.size / 2) + "px," + (this.y - this.size / 2) + "px, " + "0)"
								+ "scale3d(" + this.scale + ", " + this.scale + ", 1)";
			
			this.domElement.style.webkitTransform = tranformString;
			this.domElement.style.MozTransform = tranformString;
			
		},
		update: function(scale, opacity) {
			this.scale += scale;
			this.opacity *= opacity;
			this.domElement.style.opacity = this.opacity;
			this.applyTransform();
		}
	};
	
	function animate() {
		requestAnimationFrame(animate);
		
		if(mouse.x != mouse.px && mouse.y != mouse.py) {
		
			var obj = trails.shift();
			
			if(obj) {
				obj.x = mouse.x;
				obj.y = mouse.y;
				obj.opacity = 1;
				obj.domElement.style.opacity = obj.opacity;
				toAnimate.push(obj);
			}
			
		}

		for(var i = toAnimate.length - 1; i >= 0; i--) {
		
			toAnimate[i].update(0.1, 0.92);
			
			if(toAnimate[i].opacity < 0.05) {
			
				toAnimate[i].opacity = 0;
				toAnimate[i].scale = 0;
				toAnimate[i].domElement.style.opacity = toAnimate[i].opacity;

				var temp = toAnimate.splice(i, 1);
				trails.push(temp[0]);
			}
					
		}
		
		mouse.px = mouse.x;
		mouse.py = mouse.y;
		
	}
	
	var mainContainer = w.document.getElementById("main-container"),
		MAX_TRAIL = 60,
		trails = [],
		toAnimate = [],
		ctr = 0,
		mouse = {
			x: w.innerWidth / 2, 
			y: w.innerHeight / 2,
			px: w.innerWidth / 2, 
			py: w.innerHeight / 2
		};
		
	for(var i = 0; i < MAX_TRAIL; i++) {
	
		var square = new Square(w.innerWidth / 2, w.innerHeight / 2);
		
		trails.push(square);
		
		square.applyTransform();
		mainContainer.appendChild(square.domElement);
		
	}
	
	w.addEventListener("mousemove", function(e) {
		if(e.x) {
			mouse.x = e.x;
		}
		else if(e.clientX) {
			mouse.x = e.clientX;
		}
		
		if(e.y) {
			mouse.y = e.y;	
		}
		else if(e.clientY) {
			mouse.y = e.clientY;
		}
	});
	
	animate();
	
	
})(window);