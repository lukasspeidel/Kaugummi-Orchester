Matter.use("matter-wrap");

let trampolineRed;
let trampolineGreen;
let ball;
let drumstick1;
let drumstick2;
let ground;
let boxes;
let becken;
let beckenSpacer1;
let beckenSpacer2;

let meinArschloch;




function setup() {
	const canvas = createCanvas(800, 600);

	// create an engine
	const engine = Matter.Engine.create();
	const world = engine.world;

	 // setup hit sound trommel1
	 Matter.Events.on(engine, 'collisionStart', function(event) {
		const pairs = event.pairs[0];
		const bodyA = pairs.bodyA;
		const bodyB = pairs.bodyB;
		if (bodyA.label === "trampolineGreen" || bodyB.label === "ball") {
		  trommel1.play();
		}
		if (bodyA.label === "ball" || bodyB.label === "trampolineGreen") {
			trommel1.play();
		  }
		});

	// setup hit sound trommel2
	 Matter.Events.on(engine, 'collisionStart', function(event) {
		const pairs = event.pairs[0];
		const bodyA = pairs.bodyA;
		const bodyB = pairs.bodyB;
		if (bodyA.label === "trampolineRed" || bodyB.label === "ball") {
			  trommel2.play();
		}
		if (bodyA.label === "ball" || bodyB.label === "trampolineRed") {
				trommel2.play();
		  }
		});
	
	// setup hit sound becken
	Matter.Events.on(engine, 'collisionStart', function(event) {
		const pairs = event.pairs[0];
		const bodyA = pairs.bodyA;
		const bodyB = pairs.bodyB;
		if (bodyA.label === "becken" || bodyB.label === "ball") {
			  becken.play();
		}
		if (bodyA.label === "ball" || bodyB.label === "becken") {
				becken.play();
		  }
		});	
	
	  // config wrap area
	const wrap = {
		min: { x: 0, y: 0 },
		max: { x: width, y: height },
	};
	
	becken = new Block(world, { x: 600, y: 320, w: 200, h: 8, color: 'white' },{label: "becken" });
  // add revolute constraint for becken
  	becken.constrainTo(null, { stiffness: 1, length: 0 });

  // ball and becken spacer for limit
 	 beckenSpacer1 = new Block(world, { x: 630, y: 265, w: 35, h: 50, color: 'white' }, {isStatic: true });
		
	 beckenSpacer2 = new Block(world, { x: 675, y: 385, w: 20, h: 50, color: 'pink' }, {isStatic: true });

	 ball = new Ball(
		world,
		{ x: 50, y: 50, r: 20, color: "white"},  
		{ density: 0.007, plugin: { wrap: wrap }, label: "ball"}
		)

	
	//drumsticks
	drumstick1 = new Block(world, { x: 680, y: 300, w: 80, h: 2, color: 'white'},{ density: 0.0003, friction: 1, frictionAir: 0.001});
	drumstick2 = new Block(world, { x: 680, y: 300, w: 80, h: 2, color: 'white'},{ density: 0.0003, friction: 1, frictionAir: 0.001});

	//Trommeln
	trampolineGreen = new Block(
		world,
		{ x: 50, y: 500, w: 150, h: 75, color: "green" },
		{ isStatic: true, restitution: 1.1, angle: 10, label:"trampolineGreen" }
	);

	trampolineRed = new Block(
		world,
		{ x: 450, y: 500, w: 150, h: 75, color: "red" },
		{ isStatic: true, restitution: 1.8, angle: 50, label: "trampolineRed" }
	);

	ground = new Block(
		world,
		{ x: 400, y: height - 25, w: 500, h: 25, color: "grey" },
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
function playBecken() {
	var becken = document.getElementById("becken");

	becken.play();
}




function draw() {
	background("black");

	trampolineGreen.draw();
	trampolineRed.draw();
	ball.draw();
	ground.draw();
	becken.draw();
	becken.drawConstraints();
	beckenSpacer1.draw();
	beckenSpacer2.draw();
	drumstick1.draw();
	drumstick2.draw();
}

	// ball
/* 	function ballSpawn(){
	 	ball = new Ball(
		world,
		{ x: 50, y: 50, r: 20, color: "white"},  
		{ density: 0.007, plugin: { wrap: wrap }, label: "ball"}
		ball.push(new)
	)}

	function spacebarSpawn(event) {
		if (keyCode === 32) {
		  ballSpawn();
		}} */