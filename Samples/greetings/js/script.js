hslContainer = null;
$(document).ready(function(){
	var _window = $(window);
	hslContainer = $(".container");
	hslContainer.width(_window.width());
	hslContainer.height(_window.height());
	
	var boxModel = {
		width: 100,
		height: 100
	},
		dimensionModel = {
			maxRow: 8,
			maxCol: 16,
			colSpacing: 10,
			rowSpacing: 10
	};
	
	
	createGrid(boxModel, dimensionModel);
	
	
	var banner = $("<div></div>").addClass("banner");			
	hslContainer.append(banner);
	banner.text("merry christmas!");

	banner.css({
		left: _window.width() - 350 - banner.width()/2 + "px",
		top: _window.height() - 185 - banner.height()/2 + "px"
	});						

	
	setInterval(animate, 1000/60);
	
});


function animate()
{

	$(".box").each(function(){
		var	current = $(this),
			angleSpeed = parseFloat(current.attr("angleSpeed")),
			angle = parseFloat(current.attr("angle"));
			
			
		angle = (angle + angleSpeed) % 360;
		
		var hue = (360 + Math.cos(angle * Math.PI / 180) * 360) % 360;
		
		
		current.attr({
			angle: angle
		});
		
		current.css({
			background: "hsla("+hue+", 100%, 45%, 0.8)"
		});
	
	});
		
	

}

function createGrid(boxModel, dimensionModel)
{
	var box = null;
	
	var totalWidth = (boxModel.width + dimensionModel.colSpacing) * (dimensionModel.maxCol-1),
		x = 0;
		
	var totalHeight = (boxModel.height + dimensionModel.rowSpacing) * (dimensionModel.maxRow-1),
		y = 0;				
		
		
	for(var row = 0; row < dimensionModel.maxRow; row++)
	{
		y = (hslContainer.height() - totalHeight) / 2 + row * (boxModel.height + dimensionModel.rowSpacing);
		
		for(var col = 0; col < dimensionModel.maxCol; col++)
		{
			x = (hslContainer.width() - totalWidth) / 2 + col * (boxModel.height + dimensionModel.rowSpacing);
			box = createBox(boxModel, x, y);	
			hslContainer.append(box);
		}

	}
}

function createBox(boxModel, x, y)
{
	var box = $("<div></div>").addClass("box");
	box.width(boxModel.width + Math.random() * boxModel.width);
	box.height(boxModel.height + Math.random() * boxModel.height);
	
	var attributes = {
		angleSpeed: Math.random(),
		angle: Math.random() * 360
	};
	box.attr(attributes);
	
	box.css({
		left: (x - boxModel.width / 2 )+ "px",
		top: (y - boxModel.height / 2 )+ "px"
		
	});	

	return box;
}