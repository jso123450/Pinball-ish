/* ----------------- CHECK JS ----------------- */

console.log("Hello!@!@! I'm Pinball!");

/* ----------------- PINBALLY ----------------- */

// Variables
var fakeCanvas = document.getElementById("fakeCanvas");

var width = fakeCanvas.getAttribute("width");
var height = fakeCanvas.getAttribute("height");

var intervalID;
var svgNSID = "http://www.w3.org/2000/svg";

// Buttons
var startButton = document.getElementById("startButton");
var stopButton = document.getElementById("stopButton");
var clearButton = document.getElementById("clearButton");

// Clearing the SVG "canvas"
function clear(){
    while (fakeCanvas.lastChild)
	fakeCanvas.removeChild(fakeCanvas.lastChild);
};

clearButton.addEventListener( "click", clear() );

var pinNum = 0;

function setupPin(){
    // setup pin
    var pin = document.createElementNS( svgNSID, "rect" );
    var pinHeight = 100;
    var pinWidth = 10;
    var ball = document.getElementById("ball");
    var cx = parseInt(ball.getAttribute("cx"));
    var cy = parseInt(ball.getAttribute("cy"));
    var radius = parseInt(ball.getAttribute("r"));

    pin.setAttribute( "x", cx-(pinWidth/2) );
    pin.setAttribute( "y", cy+radius );
    pin.setAttribute( "width", pinWidth );
    pin.setAttribute( "height", pinHeight );
    pin.setAttribute( "fill", "red" );
    pin.setAttribute( "stroke", "black" );
    var rotate = (Math.random() * 360); 
    pin.setAttribute( "id", rotate );
    pin.setAttribute( "transform", "rotate(" + rotate + ",350,350)" );
    fakeCanvas.appendChild( pin );
    pinNum+= 1;
};


var startGame = function(e){
    e.preventDefault();
    clear();
    var ball = document.createElementNS( svgNSID, "circle" );
    var cx = width/2;
    var cy = height/2;
    var radius = 100;

    ball.setAttribute( "id", "ball" );
    ball.setAttribute( "cx", cx);
    ball.setAttribute( "cy", cy );
    ball.setAttribute( "r", radius );
    ball.setAttribute( "fill", "gray" );
    ball.setAttribute( "stroke", "black" );
    fakeCanvas.appendChild( ball );

    for(var i = 0; i <  Math.random() * 150; i++)
	setupPin();
    
   
    var animateCode = function(){
	length = fakeCanvas.children.length;
	// skip over the 0th index because it is the ball
	for (i = 1; i < length; i++){
	    pin = fakeCanvas.children[i]
	    pin.setAttribute( "transform", "rotate(" + parseInt(pin.getAttribute("id")) + 1 + ",350,350)" );
	    pin.setAttribute("id", parseInt( pin.getAttribute("id"))  + 1);
	    //pin.setAttribute( "x", 
	}
    };
    intervalID = window.setInterval(animateCode, 60);
};

var stop = function(){
    window.clearInterval(intervalID);
};

var clicked = function(e){
    e.preventDefault();
    x = e.offsetX;
    y = e.offsetY;

    var inBounds = function(mx,my){
	for (var index in fakeCanvas.children){
	    var pin = fakeCanvas.children[index];
	    /* HOW TO DO MATH ??? 
	    var pinWidth = pin.getAttribute("width");
	    var pinHeight = pin.getAttribute("height");
	    var x = pin.getAttribute("x");
	    var y = pin.getAttribute("y");
	    var rotation_angle = parseInt(pin.getAttribute("id"));
	    var actualX = (x - 350) * Math.cos(rotation_angle) - (y - 350) * Math.sin(rotation_angle) + 350;
	    var actualY = (x - 350) * Math.sin(rotation_angle) - (y - 350) * Math.cos(rotation_angle) + 350;
	    if ((mx >= (actualX - pinWidth)) && (mx <= (actualX + pinWidth))){
		if ( (my >= (actualY - pinHeight)) && (my <= (actualY + pinHeight))){
		    pin.remove();
		    pinNum-= 1;
		} 
	    }
	    */
	    if( mx >= pin.getAttribute("x") && mx <= pin.getAttribute("x") + pin.getAttribute("width")){
		if (my >= pin.getAttribute("y") && my <= pin.getAttribute("y") + pin.getAttribute("height")){
		    pin.remove();
		} 
	    }
	}
    };

    inBounds(x, y);
}	


startButton.addEventListener( "click", startGame );
stopButton.addEventListener( "click", stop );
fakeCanvas.addEventListener( "click", clicked );
