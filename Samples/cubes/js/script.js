(function(w) {

	function Plane(settings) {
		this.position = settings.position;
		this.rotation = settings.rotation;
		this.scale = settings.scale;
		this.color = settings.color;
		this.width = settings.width;
		this.height = settings.height;
		
		this.domElement = w.document.createElement("div");
		this.domElement.className = "plane";
		this.domElement.style.background = this.color;
		this.domElement.style.width = this.width + "px";
		this.domElement.style.height = this.height + "px";
	}
	
	Plane.prototype = {
		applyTransform: function() {
			var transformString = "translate3d(" + (this.position.x - this.width / 2) + "px, " + (this.position.y - this.height / 2) + "px, " + this.position.z + "px) "
								+ "rotateX(" + this.rotation.x + "deg) rotateY(" + this.rotation.y + "deg) rotateZ(" + this.rotation.z + "deg) "
								+ "scale3d(" + this.scale.x + ", " + this.scale.y + ", 1)";
			
			this.domElement.style.webkitTransform = transformString;
			this.domElement.style.MozTransform = transformString;
			this.domElement.style.transform = transformString;
		}
	};
	
	function Cube(settings) {
		this.position = settings.position;
		this.rotation = settings.rotation;
		this.scale = settings.scale;
		this.size = settings.size;
		this.colors = settings.colors;
		this.opacity = settings.opacity;
		this.domElement = w.document.createElement("div");
		
		this.domElement.className = "cube";
		this.domElement.style.width = this.size + "px";
		this.domElement.style.height = this.size + "px";
		this.domElement.style.zIndex = this.position.z;
		this.domElement.style.opacity = this.opacity;
				
		this.sides = {
			front: new Plane({
				position: {x: this.size / 2 , y: this.size / 2, z: this.size / 2},
				rotation: {x: 0, y: 0, z: 0},
				scale: {x: 1, y: 1},
				color: this.colors.front,
				width: this.size,
				height: this.size
			}),
			back: new Plane({
				position: {x: this.size / 2, y: this.size / 2, z: -this.size / 2},
				rotation: {x: 0, y: 180, z: 0},
				scale: {x: 1, y: 1},
				color: this.colors.back,
				width: this.size,
				height: this.size
			}),
			left: new Plane({
				position: {x: -this.size / 2, y: this.size / 2, z: this.size / 2},
				rotation: {x: 0, y: -90, z: 0},
				scale: {x: 1, y: 1},
				color: this.colors.left,
				width: this.size,
				height: this.size
			}),			
			right: new Plane({
				position: {x: this.size + this.size / 2, y: this.size / 2, z: this.size / 2},
				rotation: {x: 0, y: 90, z: 0},
				scale: {x: 1, y: 1},
				color: this.colors.right,
				width: this.size,
				height: this.size
			}),			
			top: new Plane({
				position: {x: this.size / 2, y: -this.size / 2, z: this.size / 2},
				rotation: {x: 90, y: 0, z: 0},
				scale: {x: 1, y: 1},
				color: this.colors.top,
				width: this.size,
				height: this.size
			}),
			bottom: new Plane({
				position: {x: this.size / 2, y: this.size + this.size / 2, z: this.size / 2},
				rotation: {x: -90, y: 0, z: 0},
				scale: {x: 1, y: 1},
				color: this.colors.bottom,
				width: this.size,
				height: this.size
			})
		};
		
		this.sides.left.domElement.style.webkitTransformOrigin = "100% 50%";
		this.sides.right.domElement.style.webkitTransformOrigin = "0 50%";
		this.sides.top.domElement.style.webkitTransformOrigin = "50% 100%";
		this.sides.bottom.domElement.style.webkitTransformOrigin = "50% 0";
		
		for(var key in this.sides) {
			this.sides[key].applyTransform();
			this.domElement.appendChild(this.sides[key].domElement);
		}
	}
	
	Cube.prototype = {
		applyTransform: function() {
			var transformString = "translate3d(" + (this.position.x - this.size / 2) + "px, " + (this.position.y - this.size / 2) + "px, " + (this.position.z - this.size / 2) + "px) "
								+ "rotateX(" + this.rotation.x + "deg) rotateY(" + this.rotation.y + "deg) rotateZ(" + this.rotation.z + "deg) "
								+ "scale3d(" + this.scale.x + ", " + this.scale.y + "," + this.scale.z + ")";
			
			this.domElement.style.webkitTransform = transformString;
			this.domElement.style.MozTransform = transformString;
			this.domElement.style.transform = transformString;
		}
	};
	
	function animate() {
		requestAnimationFrame(animate);
			
		for(var i = 0, len = MAX_CUBE; i < len; i++) {
			
			var cube = cubes[i];
		
			cube.rotation.x += 3;
			cube.rotation.y += 2;
			cube.rotation.z += 1;
			
			cube.applyTransform();		
			
		}

	}
	
	var mainContainer = {
		width: w.innerWidth,
		height: w.innerHeight,
		domElement: w.document.getElementById("main-container")
	},
	cubes = [],
	MAX_CUBE = 100,
	MAX_Z = 10000,
	zpos = 0,
	zDec = MAX_Z / MAX_CUBE,
	hue = Math.random() * 360;
	
	for(var i = 0; i < MAX_CUBE; i++) {
		
		var brightness = 100 - Math.abs(Math.abs(zpos) - MAX_Z) / MAX_Z * 50;
		var cube = new Cube({
			position: {
				x: mainContainer.width / 2 + Math.round(Math.random() * 1000 - 500),
				y: mainContainer.height / 2 + Math.round(Math.random() * 1000 - 500),
				z: zpos
			},
			rotation: {
				x: Math.random() * 360,
				y: Math.random() * 360,
				z: Math.random() * 360
			},
			scale: {
				x: 1,
				y: 1,
				z: 1
			},
			size: 100,
			colors: {
				front: 	"hsl(" + hue +", 80%, " + brightness + "%)",
				back: 	"hsl(" + hue +", 80%, " + brightness + "%)",
				left: 	"hsl(" + hue +", 80%, " + brightness + "%)",
				right: 	"hsl(" + hue +", 80%, " + brightness + "%)",
				top: 	"hsl(" + hue +", 90%, " + brightness + "%)",
				bottom: "hsl(" + hue +", 90%, " + brightness + "%)"
			},
			opacity: 1
		});
		
		cube.applyTransform();
		mainContainer.domElement.appendChild(cube.domElement);

		cubes.push(cube);
		
		zpos -= zDec;
		
	}
	
	animate();
	
})(window);