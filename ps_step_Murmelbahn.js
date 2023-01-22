// Homeworks.aufgabe = 7;

Matter.use("matter-wrap");
const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;

// the Matter engine to animate the world
let engine;
let world;
let ball;
let mouse;
let mConstraint;
let isDrag = false;
let elevator;

// an array to contain all the blocks created
let blocks = [];
let trap;
// let trompete;

//Bild svg reinladen

// function preload() {
// 	trompete = loadImage("img/trompete.png");
// }

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent("thecanvas");

	engine = Matter.Engine.create();
	world = engine.world;

	//Plattform unten
	blocks.push(
		new BlockCore(
			world,
			{
				x: 400,
				y: 440,
				w: 400,
				h: 5,
				color: "white",
			},
			{ angle: radians(0), isStatic: true, friction: 0.0 }
		)
	);

	//Plattform oben
	blocks.push(
		new BlockCore(
			world,
			{
				x: 400,
				y: 400,
				w: 400,
				h: 5,
				color: "white",
			},
			{ angle: radians(0), isStatic: true, friction: 0.0 }
		)
	);

	//Boden
	blocks.push(
		new BlockCore(
			world,
			{
				x: windowWidth / 2,
				y: 800,
				w: windowWidth,
				h: 40,
				color: "gray",
				force: { x: 0.0, y: 0.1 },
			},
			{ isStatic: true }
		)
	);

	blocks.push(
		new PolygonFromSVG(
			world,
			{
				x: 210,
				y: 570,
				fromFile: "img/trompete.svg",
				scale: 1,
				color: "yellow",
				force: { x: 0.0, y: 0.0 },
			},
			{ isStatic: true, friction: 0.0 }
		)
	);

	// Elevator;
	elevator = new Block(
		world,
		{ x: 430, y: 425, w: 50, h: 30, color: "grey" },
		{ isStatic: true }
	);

	// the ball has a label and can react on collisions
	ball = new Ball(
		world,
		{
			x: 450,
			y: 420,
			r: 15,
			color: "magenta",
		},
		{
			label: "Murmel",
			isStatic: false,
			density: 0.001,
			restitution: 0.9,
			friction: 0.1,
			frictionAir: 0.0,
		}
	);
	blocks.push(ball);

	// add a mouse so that we can manipulate Matter objects
	mouse = new Mouse(engine, canvas, { stroke: "blue", strokeWeight: 3 });
	// const mouseScale = 1 + (1 / (scale / (1 - scale)))
	// Mouse.setScale(mouse, { x: mouseScale, y: mouseScale });

	// process mouseup events in order to drag objects or add more balls
	mouse.on("startdrag", (evt) => {
		isDrag = true;
	});

	// run the engine
	Matter.Runner.run(engine);

	// process collisions - check whether block "Murmel" hits another Block
	Events.on(engine, "collisionStart", function (event) {
		var pairs = event.pairs;
		pairs.forEach((pair, i) => {
			if (pair.bodyA.label == "Murmel") {
				pair.bodyA.plugin.block.collideWith(pair.bodyB.plugin.block);
			}
			if (pair.bodyB.label == "Murmel") {
				pair.bodyB.plugin.block.collideWith(pair.bodyA.plugin.block);
			}
		});
	});
}

function draw() {
	background(0, 10);
	blocks.forEach((block) => block.draw());
	mouse.draw();
	elevator.draw();
}

function keyPressed() {
	// is SPACE pressed and character touching a surface?
	if (keyCode === 32) {
		let direction = 1;
		Matter.Body.applyForce(ball.body, ball.body.position, {
			x: 0.1,
			y: 0.0,
		});
	}
}
