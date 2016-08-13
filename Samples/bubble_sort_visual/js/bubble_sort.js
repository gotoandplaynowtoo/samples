/*
**********************************************
	GLOBAL VARIABLES
**********************************************
*/

var bubbleSortContainer = null,
	newLen = null,
	len = null,
	intervalId = null,
	playFlag = true,
	pauseFlag = false,
	stopFlag = false,
	firstRunFlag = true,
	iterator = 1,
	lblNumOfObj = null,
	tempClassObjSize = null,
	objSize = null, 
	currentChild = null,
	prevChild = null,
	btnStop = null,
	btnPlay = null
	btnPause = null,
	currentBtn = null,
	imgURL = "url('img/glyphicons-halflings.png')";
	
	//Temps
	var tempHeight = null,
		tempY = null;


/*
**********************************************
	INITIALIZER FUNCTIONS
**********************************************
*/		
function init()
{
	bubbleSortContainer = document.getElementById("bubble-sort-container"); 
	lblNumOfObj = document.getElementById("no-of-obj"); 
	
	var arrClassObjSize = document.getElementsByClassName("obj-size");
	var arrLen = arrClassObjSize.length;
	
	for(var i = 0; i < arrLen; i++)
	{
		arrClassObjSize[i].addEventListener("click", sizeHandler, false);
	}//end of for loop
	
	arrClassObjSize[2].style.textShadow = "0px 0px 10px #ffc";
	
	tempClassObjSize = arrClassObjSize[2];
	objSize = 15; // set size to medium
				
	initObjects(); 
	
	btnPlay = document.getElementById("play");
	btnPause = document.getElementById("pause");
	btnStop = document.getElementById("stop");
	
	btnPlay.addEventListener("click", play, false);
	btnPause.addEventListener("click", pause, false);
	btnStop.addEventListener("click", stop, false);		
	
	document.getElementById("random").addEventListener("click", random, false);
	
	btnStop.style.background = imgURL + " no-repeat -312px -72px";
	currentBtn = btnStop;
	
	
	
	console.log("init()");
	
} // end function init()
				
function initObjects()
{

	var width = objSize; 
	var height = null;
				
	iterator = 1;
	newLen = 0;
	len = Math.floor((bubbleSortContainer.clientWidth) / width); // compute how many objects to create
	lblNumOfObj.innerHTML = len;
	
	var obj = null;
	
	if(!firstRunFlag)
	{
		obj = bubbleSortContainer.firstChild;
	}//end if
	
	for(var i = 0; i < len; i++)
	{
		height = 1 + Math.floor(Math.random() * 290);
		
		if(firstRunFlag)
		{
			obj = createObject(width, height, "#9CC962", i);
			bubbleSortContainer.appendChild(obj);	
		}//end if

		
		obj.style.left = (i * width) + "px";
		obj.style.top = (bubbleSortContainer.clientHeight - height)+"px";				
		obj.style.width = width + "px";
		obj.style.height = height + "px";
		
		obj._height = height;
		obj._x = i * width;
		obj._y = bubbleSortContainer.clientHeight - height;					
		
		
		if(!firstRunFlag)
		{
			obj = obj.nextSibling;
			
			if(!obj && i < len-1)
			{
				obj = createObject(width, height, "#9CC962", i);
				bubbleSortContainer.appendChild(obj);							
				
			} // end if inner

		}//end if outer
		
	}//end for loop
	
	currentChild = bubbleSortContainer.firstChild;
	firstRunFlag = false;
	

	console.log("initObject()");
}//end of function initObjects()


/*
**********************************************
	EVENT HANDLERS
**********************************************
*/		
function sizeHandler(e)
{
	tempClassObjSize.style.textShadow = "";
	tempClassObjSize.setAttribute("class", "text-glow obj-size");
	
	
	e.target.setAttribute('class', '');
	e.target.style.textShadow = "0px 0px 10px #ffc";
	
	tempClassObjSize = e.target;
	
	
	switch(e.target.innerHTML.trim())
	{
		case "mini": 
			objSize = 2;
		break;
		case "small": 
			objSize = 5;
		break;
		case "medium": 
			objSize = 15;
		break;
		case "large": 
			objSize = 45;
		break;
		case "x-large": 
			objSize = 65;
		break;
		
		case "xx-large": 
			objSize = 90;
		break;
	}//end of switch
	
			
	var l = Math.floor((bubbleSortContainer.clientWidth) / objSize);
	len = bubbleSortContainer.childNodes.length;
	
	ctr = (len - l);
	
	if(l < len)
	{
		while(ctr > 0)
		{
			bubbleSortContainer.removeChild(bubbleSortContainer.lastChild);
			ctr--;
			
		}//end while
	
	}//end if

	if(!playFlag)
	{
		clearInterval(intervalId);
		playFlag = true;
		pauseFlag = false;
		stopFlag = false;				
	}//end if
	
		
	initObjects();
	
	currentBtn.style.background = "";
	currentBtn = btnStop;
	btnStop.style.background = imgURL + " no-repeat -312px -72px";
	
	
	console.log("sizeHandler()");
}//end of funciton sizeHandler		


function stop(e)
{
	if(stopFlag)
	{
		pause(e);
		initObjects();
		stopFlag = false;
		
		currentBtn.style.background = "";
		btnStop.style.background = imgURL + " no-repeat -312px -72px";
		currentBtn = btnStop;
		
		console.log('stop');
	}//end if
}//end function stop()


function random(e)
{
	stopFlag = true;
	playFlag = true;
	stop(e);
	console.log("random");
}//enf of function random

function play(e)
{
	if(playFlag)
	{
		intervalId = setInterval(animate, 1000/60);
		playFlag = false;
		pauseFlag = true;
		stopFlag = true;
		
		currentBtn.style.background = "";
		btnPlay.style.background = imgURL + " no-repeat -264px -72px";
		currentBtn = btnPlay;				
		
		console.log('play');		
	}//end if
}//end of function play


function pause(e)
{
	if(pauseFlag)
	{
		clearInterval(intervalId);
		playFlag = true;
		pauseFlag = false;
		stopFlag = true;
		
		currentBtn.style.background = "";
		btnPause.style.background = imgURL + " no-repeat -288px -72px";
		currentBtn = btnPause;							
		
		console.log('pause');
	}//end if
}//end of function pause		


/*
**********************************************
	ANIMATOR
**********************************************
*/		
function animate()
{	
	if(iterator < len)
	{
		prevChild = currentChild;
		currentChild = currentChild.nextSibling;
		
		bubbleSort();
		
	}//end if
	else
	{
		len = newLen;
		newLen = 0;
		iterator = 0;
		currentChild = bubbleSortContainer.firstChild;
	}//end else
	
	
	iterator++;
				
	
	if(len == 0)
	{
		pauseFlag = false;
		playFlag = false;
		stopFlag = false;
		
		currentBtn.style.background = "";
		currentBtn = btnStop;
		btnStop.style.background = imgURL + " no-repeat -312px -72px";				
		
		clearInterval(intervalId);
		
		console.log("animation stop");
	}//end if
	
	console.log("animating");
	
}//end function animate()	


/*
**********************************************
	OBJECT CREATOR
**********************************************
*/		
function createObject(width, height, color, id)
{
	var obj = document.createElement("div");
	obj.style.width = width + "px";
	obj.style.height = height + "px";
	obj.style.background = color;
	obj.style.position = "absolute";
	
	obj.setAttribute("id", id);
	
	return obj;		
	
}//end createObject()


/*
**********************************************
	BUBBLE SORT FUNCTIONS
**********************************************
*/		
function bubbleSort()
{	
	if(prevChild._height > currentChild._height)
	{
		swap();
		newLen = iterator;
	}
	
}//end of bubble_sort function

function swap()
{	
	tempHeight = prevChild._height;
	tempY = prevChild._y;
	
	prevChild._height = currentChild._height;
	prevChild.style.height = currentChild._height + "px";
	
	prevChild._y = currentChild._y;
	prevChild.style.top = currentChild._y + "px";
	
	
	currentChild._height = tempHeight;
	currentChild.style.height = tempHeight + "px";
	
	currentChild._y = tempY;
	currentChild.style.top = tempY + "px";
	
}//end of function swap()		





/*
**********************************************
	PROGRAM STARTS HERE
**********************************************
*/		

init();