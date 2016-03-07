/* ----------------- JAVASCRIPT ----------------- */

console.log("Hello!@!@! I'm Pinball");

/* ----------------- PINBALLY ----------------- */

// Variables
var fakeCanvas = document.getElementById("fakeCanvas");

var width = fakeCanvas.getAttribute("width");
var height = fakeCanvas.getAttribute("height");

var intervalID;
var svgNSID = "http://www.w3.org/2000/svg";

// startGame

var startButton = document.getElementById("startButton");

var clear = function(){
    while (fakeCanvas.lastChild)
	fakeCanvas.removeChild(fakeCanvas.lastChild);
};

var startGame = function(e){
    e.preventDefault();
    // setup ball
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

    // setup pin
    var pin = document.createElementNS( svgNSID, "rect" );
    var pinHeight = 100;
    var pinWidth = 10;
    var ball = document.getElementById("ball");
    var cx = parseInt(ball.getAttribute("cx"));
    var cy = parseInt(ball.getAttribute("cy"));
    var radius = parseInt(ball.getAttribute("r"));

    pin.setAttribute( "x", cx-(pinWidth/2) );
    pin.setAttribute( "y", cy+radius+100 );
    pin.setAttribute( "width", pinWidth );
    pin.setAttribute( "height", pinHeight );
    pin.setAttribute( "fill", "red" );
    pin.setAttribute( "stroke", "black" );
    pin.setAttribute( "transform", "rotate(45,350,350)" );
    fakeCanvas.appendChild( pin );

    // rotation
    var animateCode = function(){
	
    };
};


startButton.addEventListener( "click", startGame );
