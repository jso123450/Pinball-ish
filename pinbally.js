/* ----------------- JAVASCRIPT ----------------- */

console.log("Hello!@!@! I'm Pinball");

/* ----------------- PINBALLY ----------------- */

// Variables
var fakeCanvas = document.getElementById("fakeCanvas");

var width = fakeCanvas.getAttribute("width");
var height = fakeCanvas.getAttribute("height");

var intervalId;
var svgNSID = "http://www.w3.org/2000/svg";

// startGame

var startButton = document.getElementById("startButton");
var stopButton = document.getElementById("stopButton");


var clear = function(){
    while (fakeCanvas.lastChild)
	fakeCanvas.removeChild(fakeCanvas.lastChild);
};

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
    // setup ball
    //TODO clear
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
	console.log("animating");

	 for (var kiddie in fakeCanvas.children){
	     console.log(kiddie);
	     
	     var pin = fakeCanvas.children[kiddie];
	     console.log(pin);
	     pin.setAttribute( "transform", "rotate(" + parseInt(pin.getAttribute("id")) + 5 + ",350,350)" );
	     pin.setAttribute("id", parseInt( pin.getAttribute("id"))  + 50);
	 }
	
	// rotation
    };
    intervalId = window.setInterval(animateCode, 16);
    
};

var stop = function(){
    window.clearInterval(intervalId);
};



startButton.addEventListener( "click", startGame );
stopButton.addEventListener("click", stop );
