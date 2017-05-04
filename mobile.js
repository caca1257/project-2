var alpha, beta, gamma;
var xmotion, ymotion, zmotion; 

var fillR, fillG, fillB;
var circle;
var circleDiameter = 75;

var value = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	

	fillR = floor(random(0,255));
	fillG = floor(random(0,255));
	fillB = floor(random(0,255));

}

function draw() {
	background(0);
	fill(fillR, fillG, fillB);
	
 	circle = ellipse(width/2, height/2, circleDiameter, circleDiameter);

	//send value to the DOM
	// document.getElementById('circD').innerHTML = circleDiameter;
	// 	socket.emit('theDiameter',{
	// 		'circleD': circleDiameter
	// 	});

	if(circleDiameter === 75){
		eraseRinglet();
	}

	if (circleDiameter > 75 && circleDiameter < 600){
	  decreaseD();
	  return;
	}
	// if(circleDiameter >= 600){
	// 	stopGrowing();
	// 	return;
	// }


}

function touchStarted(){
	circleDiameter = circleDiameter + 15;

	
    //to do: send size of circle also
    socket.emit('touchCircle',{
    	'fillR': fillR,
    	'fillB': fillB,
    	'fillG': fillG, 
    	'circleDiameter': circleDiameter
    });


}

function decreaseD(){
	circleDiameter--;
}

// function stopGrowing(){
// 	circleDiameter = 600;
// }

function eraseRinglet(){
	socket.emit('eraseRinglet',{
		'fillR': fillR,
    	'fillB': fillB,
    	'fillG': fillG
	});
}

function init(){

	////// ORIENTATION

	// declare the variables that we'll be using for orientation


	// function for orientation
	function handleOrientation(event){
		alpha=Math.floor(event.alpha);
		// beta=Math.floor(event.beta);
		gamma=Math.floor(event.gamma);
		
			
		
		
		// send how much to increase water by and which team
		socket.emit('orientation', {
			// 'alpha': alpha,
			// 'beta': beta,
			'gamma':gamma
			
		});

		
		// send values to the DOM so that we can see them
		// document.getElementById('alpha').innerHTML=alpha;
		// document.getElementById('beta').innerHTML=beta;
		// document.getElementById('gamma').innerHTML=gamma;
		// socket.emit('orientation', {
		// 			// 'alpha': alpha,
		// 			// 'beta': beta,
		// 			// 'gamma':gamma
		// 		});

	}
	// event listener for orientation
	window.addEventListener('deviceorientation',handleOrientation, true);


	////// MOTION

	function deviceMotion(event){
		var acc=event.acceleration; //will return acceleration object
		// extract x, y, z from acceleration
		xmotion=Math.abs(acc.x);
		ymotion=Math.abs(acc.y);
		zmotion=Math.abs(acc.z);

		// document.getElementById('xmov').innerHTML=Math.floor(xmotion);
		// document.getElementById('ymov').innerHTML=Math.floor(ymotion);
		// document.getElementById('zmov').innerHTML=Math.floor(zmotion);

	}
	window.addEventListener('devicemotion', deviceMotion, true);
	
}

window.addEventListener('load', init);












/*INPUT ONE: Increase and descrease of the diameter by tapping
	OUTPUT ONE: the faster you tap the more ringlets you see, as you stop tapping the 
			ringlets start fading and disappearing */

/*INPUT TWO: motion of the ball moving the ball around with the motion of your phone
	OUTPUT TWO: beta x  - changes the color of your ringlets
				gamma y - changes ????
				alpha z - changes the size of the ringlets*/





 