
var ringlets = []; 

function setup(){
  createCanvas(windowWidth, windowHeight);
  noFill();
}

function draw(){
  // background(0);
  // background(255, 5);

  // background(bg);

  // loop through all ringlets objects and call its methods
  for (var i = 0; i < ringlets.length; i++) {
    ringlets[i].grow();
    ringlets[i].display();

    if(ringlets[i].a <= 0) {
      ringlets.splice(i, 1);
    }
  }
}



function Ringlet(xin, yin, R, G, B, dm) {
  
  this.x = xin;
  this.y = yin;
  this.dm = dm;
  this.R = R;
  this.G = G;
  this.B = B;
  this.a = dm*2;



  this.grow = function(){
    this.a-=random(0, 1);
    // grow ringlet size at decelerating rate
    for(var g = 1.5; g > 0.7; g--){
      this.dm+=g;
    }
  }
  
  
  this.display = function() {
    // draw ringlets to screen
    stroke(this.R, this.G, this.B);
    strokeWeight(4);
    ellipse(this.x, this.y, this.dm, this.dm);
    strokeWeight(1.5);
    ellipse(this.x, this.y, this.dm+35, this.dm+35);
    strokeWeight(2.5)
    ellipse(this.x, this.y, this.dm+50, this.dm+50); 
    strokeWeight(1);
    ellipse(this.x, this.y, this.dm+20, this.dm+20);
  }

}

function ringletErased(data){
  //check if those ringlets are that color

  for(var j = 0; j < ringlets.length; j++){
    if(ringlets[j].R == data.fillR && ringlets[j].G == data.fillG && ringlets[j].B == data.fillB){
      ringlets[j].a = 0;
    }
  }
}

function resetCanvas(){
  clear();

}




