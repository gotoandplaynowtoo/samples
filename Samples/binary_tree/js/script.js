$(document).ready(function(){
	var windowWidth = $(window).width(),
		windowHeight = $(window).height();
		
	var container = $(".container");
	container.width(windowWidth);
	container.height(windowHeight);
	
	var node = createNode();
	node.attr("id", "root");
	node.addClass("node-animate");
	container.append(node);
	setXY(node, windowWidth/2, node.width());
	
	
	
	node.on("mouseenter", onMouseEnter);
	
	
	function onMouseEnter(){
		var currentNode = $(this);
		currentNode.off("mouseenter", onMouseEnter);
		currentNode.removeClass("node-animate");
		
		var nodes = createTwoNodes(currentNode);
		
		nodes.left.on("mouseenter", onMouseEnter);
		nodes.left.addClass("node-animate");
		container.append(nodes.left);
		
		nodes.right.on("mouseenter", onMouseEnter);
		nodes.right.addClass("node-animate");
		container.append(nodes.right);
		
		
		var line = createLine();
		
		line.css({
			background: nodes.left.css("background"),
			width: "100px",
			left: currentNode.position().left + currentNode.width() / 2,
			top: currentNode.position().top + currentNode.height() / 2
		});
		
		container.append(line);
		var dx = nodes.left.position().left - line.position().left;
		var dy = nodes.left.position().top - line.position().top;
		line.width(Math.sqrt(dx * dx + dy * dy));
		line.css({
			"-webkit-transform": "rotate("+(Math.atan2(dy, dx) * 180 / Math.PI)+"deg)",
			"-moz-transform": "rotate("+(Math.atan2(dy, dx) * 180 / Math.PI)+"deg)"
		});
		
		
		line = createLine();
		
		line.css({
			background: nodes.right.css("background"),
			width: "100px",
			left: currentNode.position().left + currentNode.width() / 2,
			top: currentNode.position().top + currentNode.height() / 2
		});
		
		container.append(line);
		dx = nodes.right.position().left - line.position().left;
		dy = nodes.right.position().top - line.position().top;
		line.width(Math.sqrt(dx * dx + dy * dy));
		line.css({
			"-webkit-transform": "rotate("+(Math.atan2(dy, dx) * 180 / Math.PI)+"deg)",
			"-moz-transform": "rotate("+(Math.atan2(dy, dx) * 180 / Math.PI)+"deg)"
		});					
			
			
		
	}//end of function onMouseEnter
	 
});


function createTwoNodes(parent)
{
	parent.data("enable", 0);
	
	var x =  (parent.attr("id") == "root") ? 20 + Math.random() * ($(window).width() / 4) : 10 + Math.random() * parent.width(),
		y = 30 + Math.random() * parent.height();
	
	var node1 = createNode();
	

	setXY(
		node1, 
		parent.position().left - x,
		parent.position().top + y
	);
	
	var node2= createNode();
	
	setXY(
		node2, 
		parent.position().left + x,
		parent.position().top + y
	);
	
	
	return {
				left: node1, 
				right: node2,
			};
}

function setXY(node, x, y)
{
	node.css({
		left: (x - node.width() / 2) + "px",
		top: (y - node.height() / 2) + "px"
	});
}

function createLine()
{
	var line = $("<div></div>").addClass("line"),
		line_css = {
			background: "white",
		};
	
	line.css(line_css);
	
	return line;
}

function createNode() {
	var size = 10 + Math.random() * 40,
		node = $("<div></div>").addClass("node").width(size).height(size),
		px = "px",
		node_css = {
			"background": "rgba(" + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", 0.8)",
			"-webkit-border-radius": (size * 0.5) + px,
			"-moz-border-radius": (size * 0.5) + px,
			"border-radius": (size * 0.5) + px
		};
		
	node.css(node_css);
	
	
	return node;
}
		
		