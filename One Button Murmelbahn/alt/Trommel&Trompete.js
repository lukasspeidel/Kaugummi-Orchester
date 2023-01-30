let trampolineRed;
let trampolineGreen;
let murmel;
let drumstick1;
let drumstick2;
let ground;
let boxes;
let becken;
let beckenSpacer1;
let beckenSpacer2;
let trompete;
let trompeteSound;
let hintergrund;
let plusTest = 1200;
let blocks = [];

let mouse;
let isDrag = false;

function preload(){
	hintergrund = loadImage('img/hintergrund.jpg');
}


function setup() {
	const canvas = createCanvas(3000, 720);


	// create an engine
	const engine = Matter.Engine.create();
	const world = engine.world;

	 // setup hit sound 
/* 	 Events.on(engine, 'collisionStart', function (event) {
		var pairs = event.pairs;
		pairs.forEach((pair, i) => {
		  if (pair.bodyA.label == 'Murmel') {
			pair.bodyA.plugin.block.collideWith(pair.bodyB.plugin.block)
		  }
		  if (pair.bodyB.label == 'Murmel') {
			pair.bodyB.plugin.block.collideWith(pair.bodyA.plugin.block)
		  }
		})
	  })
 */
	//becken 
	becken = new Block(world, { x: 600+plusTest, y: 320, w: 200, h: 8, color: 'white' },{label: "becken" });
  // add constraint for becken
  	becken.constrainTo(null, { stiffness: 1, length: 0 });

  // ball and becken spacer for limit
 	 beckenSpacer1 = new Block(world, { x: 630+plusTest, y: 265, w: 35, h: 50, color: 'white' }, {isStatic: true });
		
	 beckenSpacer2 = new Block(world, { x: 675+plusTest, y: 365, w: 20, h: 50, color: 'pink' }, {isStatic: true });

	murmel = new Ball(
		world,
		{ x: 50, y: 50, r: 20, color: "white"},  
		{ density: 0.007, label: "Murmel"}
		)
	//Trompete block
	trompete = new Block(
		world,
		{ x: 50, y: 150, w: 150, h: 25, color: "purple" },
		{ isStatic: true, label: "Trompete" }
	);
	trompeteSound = new Block(
		world,
		{ x: 150, y: 150, w: 50, h: 25, color: "red" },
		{ isStatic: true, label: "TrompeteSound" }
	);


	

	
	//drumsticks
	drumstick1 = new Block(world, { x: 680+plusTest, y: 300, w: 80, h: 2, color: 'white'},{ density: 0.0003, friction: 1.5, frictionAir: 0.001});
	drumstick2 = new Block(world, { x: 680+plusTest, y: 300, w: 80, h: 2, color: 'white'},{ density: 0.0003, friction: 1.5, frictionAir: 0.001});

	//Trommeln
	blocks.push(new BlockCore(
		world,
		{ x: 50+plusTest, y: 500, w: 150, h: 75, color: "green", trigger: (ball, block) => {
			// console.log("Trigger ", ball, block, Trommel1);
			trommel1.play();	
		  } },
		{ isStatic: true, restitution: 1.1, angle: 10, label:"TrampolineGreen" }
	));

	trampolineRed = new Block(
		world,
		{ x: 450+plusTest, y: 500, w: 150, h: 75, color: "red" },
		{ isStatic: true, restitution: 1.8, angle: 50, label: "TrampolineRed" }
	);

	ground = new Block(
		world,
		{ x: 400+plusTest, y: height - 25, w: 500, h: 25, color: "grey" },
		{ isStatic: true }
	);


	
	// run the engine
	Matter.Runner.run(engine);
}
	//sound player
function playTrommel1() {
	var trommel1 = document.getElementById("trommel1");

	trommel1.play();
}
function playTrommel2() {
	var trommel2 = document.getElementById("trommel2");

	trommel2.play();
}
function playTrompete() {
	var trompete = document.getElementById("trompete");

	trompete.play();
}
//TEST für sound
function playSlap() {
	var slap = document.getElementById("slap");

	slap.play();
}

//BENNO FRAGEN!
 function playBecken() {
	var messingding = document.getElementById("messingding");

	messingding.play();
} 

function keyPressed() {
	// is SPACE pressed and character touching a surface?
	if (keyCode === 32) {
		let direction = 1;
		Matter.Body.applyForce(murmel.body, murmel.body.position, {
			x: 0.5,
			y: 0.0,
		});
	}
}



function draw() {
	background(hintergrund);

/* 	trampolineGreen.draw(); */
	trampolineRed.draw();
	murmel.draw();
	ground.draw();
	becken.draw();
	becken.drawConstraints();
	beckenSpacer1.draw();
	beckenSpacer2.draw();
	drumstick1.draw();
	drumstick2.draw();
	trompete.draw();
	trompeteSound.draw();
	blocks.forEach(block => block.draw());
}

