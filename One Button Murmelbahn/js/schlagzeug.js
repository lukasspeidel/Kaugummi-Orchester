Matter.use("matter-wrap");

let trampolineRed;
let trampolineGreen;
let ball;
let drumstick1;
let drumstick2;
let ground;
let boxes;
let catapult;
let catapultSpacer1;
let catapultSpacer2;


function setup() {
	const canvas = createCanvas(800, 600);



	// create an engine
	const engine = Matter.Engine.create();
	const world = engine.world;

	// config wrap area
	const wrap = {
		min: { x: 0, y: 0 },
		max: { x: width, y: height },
	};
	catapult = new Block(world, { x: 600, y: 320, w: 200, h: 8, color: 'white' });
  // add revolute constraint for catapult
  	catapult.constrainTo(null, { stiffness: 1, length: 0 });

  // balls and catapult spacer for limit
 	 catapultSpacer1 = new Block(world, { x: 630, y: 265, w: 35, h: 50, color: 'white' }, {isStatic: true });
		
	 catapultSpacer2 = new Block(world, { x: 675, y: 385, w: 20, h: 50, color: 'pink' }, {isStatic: true });

	 
	// ball
	ball = new Ball(
		world,
		{ x: 50, y: 50, r: 20, color: "white"},  
		{ density: 0.007, plugin: { wrap: wrap } }
	);

	drumstick1 = new Block(world, { x: 680, y: 300, w: 80, h: 2, color: 'white'},{ density: 0.0003, friction: 1, frictionAir: 0.001});
	drumstick2 = new Block(world, { x: 680, y: 300, w: 80, h: 2, color: 'white'},{ density: 0.0003, friction: 1, frictionAir: 0.001});

	
	trampolineGreen = new Block(
		world,
		{ x: 50, y: 500, w: 150, h: 75, color: "green" },
		{ isStatic: true, restitution: 1.1, angle: 10 }
	);

	trampolineRed = new Block(
		world,
		{ x: 450, y: 500, w: 150, h: 75, color: "red" },
		{ isStatic: true, restitution: 1.8, angle: 50 }
	);

	ground = new Block(
		world,
		{ x: 400, y: height - 25, w: 500, h: 25, color: "grey" },
		{ isStatic: true }
	);

	


	// run the engine
	Matter.Runner.run(engine);
}

function draw() {
	background("black");

	trampolineGreen.draw();
	trampolineRed.draw();
	ball.draw();
	ground.draw();
	
catapult.draw();
	catapult.drawConstraints();
	catapultSpacer1.draw();
	catapultSpacer2.draw();
	drumstick1.draw();
	drumstick2.draw();
}
