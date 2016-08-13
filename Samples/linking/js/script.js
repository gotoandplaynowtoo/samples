(function(w) {

	function Line(x, y, len, angle) {
	
		this.x = x;
		this.y = y;
		this.len = len;
		this.angle = angle;
		
		this.domElement = w.document.createElement("div");
		this.domElement.className = "line";
		this.domElement.style.width = this.len + "px";
		
		this.applyTransform();
		
	}
	
	Line.prototype = {
		applyTransform: function() {
			var tranformString = "translate3d(" + this.x + "px, " + this.y + "px, 0) "
								+ "rotateZ(" + this.angle + "deg)";
			this.domElement.style.webkitTransform = tranformString;
			this.domElement.style.MozTransform = tranformString;			
		},
		show: function() {
			this.domElement.style.display = "block";
		},
		hide: function() {
			this.domElement.style.display = "none";
		}
	};

	function Circle(x, y, rad, color) {
	
		this.x = x;
		this.y = y;
		this.rad = rad;
		this.color = color;
		
		this.domElement = w.document.createElement("div");
		this.domElement.className = "circle";
		this.domElement.style.width = this.rad + "px";
		this.domElement.style.height = this.rad + "px";
		this.domElement.style.backgroundColor = this.color;
		
		this.applyTransform();
		
	}
	
	Circle.prototype = {
		applyTransform: function() {
			var tranformString = "translate3d(" + (this.x - this.rad / 2) + "px, " + (this.y - this.rad / 2) + "px, 0)";
			this.domElement.style.webkitTransform = tranformString;
			this.domElement.style.MozTransform = tranformString;
		},
		show: function() {
			this.domElement.style.display = "block";
		},
		hide: function() {
			this.domElement.style.display = "none";
		}		
	};
	
	function createObjects(len, fCreate) {
		var arr = [];
		for(var i = 0; i < len; i++) {
			arr.push(fCreate());
		}
		return arr;
	}
	
	function link(circle1, circle2, line) {
		
		var dx = circle2.x - circle1.x,	
			dy = circle2.y - circle1.y,
			len = Math.sqrt(dx * dx + dy * dy),
			angle = Math.atan2(dy, dx);
			
		line.x = circle1.x;
		line.y = circle1.y;
		line.angle = angle * 180 / Math.PI;
		line.len = len;
		
		line.domElement.style.width = line.len + "px";
		line.show();
		line.applyTransform();	

		line.domElement.style.backgroundColor = circle1.color;
		
	}
	
	function animate() {
	
		requestAnimationFrame(animate);
				
		innerContainer.x += innerContainer.sx;
		innerContainer.y += innerContainer.sy;
		innerContainer.applyTransform();
		
		if(showFlag) {
			if(changeCtr > chageFrequency) {
				circles[ctr].x = (mainContainer.width / 2) - innerContainer.x;
				circles[ctr].y = (mainContainer.height / 2) - innerContainer.y;
				circles[ctr].show();
				circles[ctr].applyTransform();
				
				if(ctr > 0) {
					link(circles[ctr-1], circles[ctr], lines[ctr-1]);				
				}
				
				if(ctr >= MAX_CIRCLE - 1) {
					showFlag = false;
				}
				
				ctr = (ctr + 1) % MAX_CIRCLE;			
			}
		}
		else {
			if(changeCtr > chageFrequency) {
				circles[ctr].x = (mainContainer.width / 2) - innerContainer.x;
				circles[ctr].y = (mainContainer.height / 2) - innerContainer.y;
				circles[ctr].applyTransform();
				
				if(ctr == 0) {
					link(circles[lastCircleIndex], circles[ctr], lines[ctr2]);
				}
				else {
					link(circles[ctr-1], circles[ctr], lines[ctr2]);
				}

				ctr2 = (ctr2 + 1) % MAX_LINE;
				ctr = (ctr + 1) % MAX_CIRCLE;			
			}
		}
		
		if(changeCtr > chageFrequency) {
			
			angleInc = (30 * Math.PI / 180) * direction[Math.floor(Math.random() * direction.length)];
			angle += angleInc;
			
			innerContainer.sx = speed * Math.cos(angle);
			innerContainer.sy = speed * Math.sin(angle);
			changeCtr = 0;
		}		
		
		changeCtr++;
	}
	
	var MAX_CIRCLE = 200,
		MAX_LINE = MAX_CIRCLE - 1,
		circles = null,
		lines = null,
		lastCircleIndex = MAX_CIRCLE - 1,
		ctr = 0,
		ctr2 = 0,
		showFlag = true,
		angle = Math.random() * (Math.PI * 2),
		chageFrequency = 6,
		direction = [-1, 1],
		changeCtr = 0,
		angleInc = 30 * Math.PI / 180,
		speed = 10;	
			
	var mainContainer = {
		domElement: w.document.getElementById("main-container"),
		width: w.innerWidth,
		height: w.innerHeight
	};
		
	var innerContainer = {
		domElement: w.document.getElementById("inner-container"),
		x: mainContainer.width / 2,
		y: mainContainer.height / 2,
		sx: speed * Math.cos(angle),
		sy: speed * Math.sin(angle),
		applyTransform: function() {
			var tranformString = "translate3d(" + this.x + "px, " + this.y + "px, 0)";
			this.domElement.style.webkitTransform = tranformString;
			this.domElement.style.MozTransform = tranformString;			
		}
	};
	
	innerContainer.applyTransform();
	
	circles = createObjects(MAX_CIRCLE, function() {
		var obj = new Circle(0, 0, 10 + Math.random() * 50, "rgba(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", 1)");
		obj.hide();
		innerContainer.domElement.appendChild(obj.domElement);
		return obj;
	});
	
	lines = createObjects(MAX_LINE, function() {
		var obj = new Line(0, 0, 0, 0);
		obj.hide();
		innerContainer.domElement.appendChild(obj.domElement);
		return obj;
	});
	
	animate();
})(window);