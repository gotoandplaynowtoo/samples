var listID = 0,
	listContainer = $(".container"),
	listAngle = Math.random() * 360,
	direction = [1, -1],
	interval = 0,
	angleFrequency = 5,
	createFrequency = 2,
	angleInc = 30;
	

$(document).ready(function(){
	var _window = $(window);
	
	listContainer.css({
		left: _window.width() / 2 - listContainer.width()/2,
		top: _window.height() / 2 - listContainer.height()/2
	});
	
	
	var node = createNode("node" + listID);
	listContainer.append(node);
	setXY(node, listContainer.width()/2-node.width()/2, listContainer.height()/2-node.height()/2);

	
	setInterval(animate, 1000/60);
});//end ready


function animate()
{
	var nodeList = $(".node"),
		nodeLen = nodeList.length,
		node = null;
	
	if(interval++ > angleFrequency)
	{
		listAngle += angleInc * direction[Math.floor(Math.random() * 2)];
		interval = 0;
	}
	

	nodeList.each(function(){
		var current = $(this),
			x = parseFloat(current.attr("x")),
			y = parseFloat(current.attr("y"));
		
		
		x += Math.cos(listAngle * Math.PI / 180) * 15;
		y += Math.sin(listAngle * Math.PI / 180) * 15;
		
		
		var next = current.next();
		next.css({
			left: x + "px",
			top: y + "px"
		}); 
		
		setXY(current, x, y);

	}); //end each
	

	
	if(nodeLen < 50)
	{
		if(interval == createFrequency)
		{
			var last = nodeList.last(".node"),
				lx = parseFloat(last.attr("x")),
				ly = parseFloat(last.attr("y"));

			listID++;
			node = createNode("node"+listID);
			setXY(node, listContainer.width()/2-node.width()/2, listContainer.height()/2-node.height()/2);

			var dx = parseFloat(node.attr("x")) - lx,
				dy = parseFloat(node.attr("y")) - ly;			
			
			var line = createLine("line"+listID);
			line.width(Math.sqrt(dx * dx + dy * dy));
			line.css({
				background: node.css("background"),
				left: parseFloat(last.attr("x")) + "px",
				top: parseFloat(last.attr("y")) + "px"
			});
			
			setRotation(line, Math.atan2(dy, dx) * 180 / Math.PI);
			
			listContainer.append(line);
			listContainer.append(node);
		}
		
	}
	else
	{
		nodeList.first(".node").remove();
		$(".line").first(".line").remove();
	}
	
	
	
}

function setRotation(element, angle)
{
	element.css({
		"-webkit-transform": "rotate("+angle+"deg)",
		"-moz-transform": "rotate("+angle+"deg)"				
	});
}
	
function setXY(node, x, y)
{			
	node.attr({
		x: x,
		y: y
	});

	node.css({
		left: (x - node.width() / 2) + "px",
		top: (y - node.height() / 2) + "px"
	});
}

function createLine(_id)
{
	var line = $("<div></div>").addClass("line"),
		line_css = {
			background: "white",
		};
	
	line.attr("id", _id);
	line.css(line_css);
	
	
	return line;
}

function createNode(_id) {
	var size = 5 + Math.random() * 25,
		node = $("<div></div>").addClass("node").width(size).height(size),
		px = "px",
		node_css = {
			"background": "rgba(" + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", 1)",
			"-webkit-border-radius": (size * 0.5) + px,
			"-moz-border-radius": (size * 0.5) + px,
			"border-radius": (size * 0.5) + px
		};
	node.attr({
		id: _id,
		x: 0,
		y: 0
	});	
	node.css(node_css);
	
	
	return node;
}