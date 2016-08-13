(function(w) {

	function setStyle(circleObj) {
	
		circleObj.domElement.style.width = circleObj.radius + "px";
		circleObj.domElement.style.height = circleObj.radius + "px";
		circleObj.domElement.style.borderRadius = "50%";
		circleObj.domElement.style.marginLeft = (-circleObj.radius / 2) + "px";
		circleObj.domElement.style.marginTop = (-circleObj.radius / 2) + "px";
		
		var transformString = "translate(" + circleObj.x + "px, " + circleObj.y + "px)";
		circleObj.domElement.style.webkitTransform = transformString;
		circleObj.domElement.style.MozTransform = transformString;
		
	}
	
	function hasClass(domObj, className) {
		return domObj.className.indexOf(className) > -1;
	}

	function Circle(x, y, radius) {
	
		this.width = radius;
		this.height = radius;
		this.radius = radius;
		this.x = x;
		this.y = y;
		
		this.domElement = document.createElement("div");
		this.domElement.style.position = "absolute";
		this.domElement.className = "circle";
		this.domElement.setAttribute("data-x", this.x);
		this.domElement.setAttribute("data-y", this.y);
	
		setStyle(this);
	}
	
	var mainContainer = {
		domElement: document.getElementById("main-container"),
		width: w.innerWidth,
		height: w.innerHeight
	};
	
	mainContainer.domElement.style.width = mainContainer.width + "px";
	mainContainer.domElement.style.height = mainContainer.height + "px";	
	
	mainContainer.domElement.addEventListener("mouseover", function(e) {
		if(hasClass(e.target, 'circle') && !hasClass(e.target, 'create-disabled')) {
		
			var left = new Circle(
							Number(e.target.dataset.x) - 100 * Math.random(), 
							Number(e.target.dataset.y) + 50 * Math.random(), 
							30 * Math.random() + 10
						);
			mainContainer.domElement.appendChild(left.domElement);
			
			var right = new Circle(
								Number(e.target.dataset.x) + 100 * Math.random(), 
								Number(e.target.dataset.y) + 50 * Math.random(), 
								30 * Math.random() + 10
							);
			mainContainer.domElement.appendChild(right.domElement);
			
			e.target.className += " create-disabled";
		}
	});
	
	var firstCircle = new Circle(mainContainer.width / 2, 50, 30);
	mainContainer.domElement.appendChild(firstCircle.domElement);
	
})(window);