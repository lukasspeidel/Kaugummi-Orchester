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
let tasteAktiv;

let tasten = [];
let tastchen = [];

let size = 60;
let size_s = 20;
let gap = 0;
let colors = [];
let area = { cMax: 20, rMax: 20 };
let x, y;

let canvasElem;
let off = { x: 0, y: 0 };

// an array to contain all the blocks created
let blocks = [];
let trap;

//Sounds
let pianosounds = [];

function preload() {
	soundFormats("wav");
	pianosounds.push(loadSound("sound/C0-Piano-Final.wav"));
	pianosounds.push(loadSound("sound/D0-Piano-Final.wav"));
	pianosounds.push(loadSound("sound/EO-Piano-Final-.wav"));
	pianosounds.push(loadSound("sound/F0-Piano-Final-.wav"));
	pianosounds.push(loadSound("sound/G0-Piano-Final-.wav"));
	pianosounds.push(loadSound("sound/A0-Piano-Final.wav"));
	pianosounds.push(loadSound("sound/B0-Piano-Final-.wav"));
	pianosounds.push(loadSound("sound/C1-Piano-Final-.wav"));
	pianosounds.push(loadSound("sound/D1-Piano-Final.wav"));
	pianosounds.push(loadSound("sound/E1-Piano-Final-.wav"));
	pianosounds.push(loadSound("sound/F1-Piano-Final-.wav"));
	pianosounds.push(loadSound("sound/G1-Piano-Final.wav"));
	pianosounds.push(loadSound("sound/A1-Piano-Final.wav-.wav"));
	pianosounds.push(loadSound("sound/B1-Piano-Final-.wav"));
	pianosounds.push(loadSound("sound/C2-Piano-Final.wav"));
	pianosounds.push(loadSound("sound/D2-Piano-Final.wav"));
	pianosounds.push(loadSound("sound/E2-Piano-Final-.wav"));
	pianosounds.push(loadSound("sound/F2-Piano-Final-.wav"));
	pianosounds.push(loadSound("sound/G2-Piano-Final.wav"));
	pianosounds.push(loadSound("sound/A2-Piano-Final (1).wav"));
	pianosounds.push(loadSound("sound/B2-Piano-Final (1).wav"));
}

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent("thecanvas");

	engine = Matter.Engine.create();
	world = engine.world;

	//Sound
	// let C0Piano = document.getElementById("C0Piano");
	// let D0Piano = document.getElementById("D0Piano");
	// pianosounds = [C0Piano, D0Piano];

	canvasElem = document.getElementById("thecanvas");
	engine.world.gravity.x *= 0.5;

	(windowWidth - x) / 2;
	x = (size + gap) / 2;
	y = (size + gap) / 2;
	for (let row = 0; row < area.rMax; row++) {
		colors[row] = [];
		for (let col = 0; col < area.cMax; col++) {
			colors[row][col] = "white";
		}
	}
	//Tasten schwarz
	for (let col = 0; col < 20; col++) {
		if (col == 2 || col == 6 || col == 9 || col == 13 || col == 16) {
			continue;
		}
		let tastchen = new Block(
			world,
			{
				x: 150 + col * 60,
				y: 565,
				w: 25,
				h: 40,
				color: "black",
				stroke: "grey",
			},
			{ angle: radians(0), isStatic: true, friction: 0.0 }
		);
		blocks.push(tastchen);
	}
	//Wand
	blocks.push(
		new BlockCore(
			world,
			{
				x: 90,
				y: 565,
				w: 30,
				h: 40,
				color: "",
			},
			{ angle: radians(0), isStatic: true, friction: 0.0 }
		)
	);

	//Tasten weiß
	for (let col = 0; col < 21; col++) {
		for (let row = 0; row < 1; row++) {
			let taste = new Block(
				world,
				{
					x: 120 + col * (size + gap),
					y: 600 + row * (size + gap),
					w: size,
					h: size,
					color: "white",
					stroke: "black",
					trigger: (ball, block) => {
						//console.log("Trigger ", ball, block);
						tasteAktiv = taste;
						taste.attributes.color = "white";

						if (taste.body.position.y < 615) {
							Matter.Body.setPosition(taste.body, {
								x: taste.body.position.x,
								y: 615,
							});
							let pianosound = pianosounds[col];
							pianosound.play();
						}
					},
				},
				{ angle: radians(0), isStatic: true, friction: 0.0 }
			);
			blocks.push(taste);
		}
	}

	//Boden
	blocks.push(
		new BlockCore(
			world,
			{
				x: windowWidth,
				y: 750,
				w: 6000,
				h: 5,
				color: "",
			},
			{ angle: radians(0), isStatic: true, friction: 0.0 }
		)
	);

	// the ball has a label and can react on collisions
	ball = new Ball(
		world,
		{
			x: 115,
			y: 220,
			r: 15,
			color: "magenta",
		},
		{
			label: "Murmel",
			isStatic: false,
			density: 0.001,
			restitution: 0.3,
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
function scrollEndless(point) {
	// wohin muss verschoben werden damit point wenn möglich in der Mitte bleibt
	off = {
		x: Math.max(0, point.x - windowWidth / 2),
		y: Math.max(0),
	};
	// plaziert den Canvas im aktuellen Viewport
	canvasElem.style.left = Math.round(off.x) + "px";
	canvasElem.style.top = Math.round(off.y) + "px";
	// korrigiert die Koordinaten
	translate(-off.x, -off.y);
	// verschiebt den ganzen Viewport
	window.scrollTo(off.x, off.y);
	// Matter mouse needs the offset as well
	mouse.setOffset(off);
}

function draw() {
	clear();
	blocks.forEach((block) => block.draw());
	tasten.forEach((block) => block.draw());
	// taste.draw();
	mouse.draw();
	tastchen.forEach((block) => blockdraw());

	// position canvas and translate coordinates
	scrollEndless(ball.body.position);
}
function keyPressed() {
	if (keyCode === 32) {
		// let swingY = height / 2 + sin(frameCount * 0.15) * 30;
		if (tasteAktiv) {
			Matter.Body.setPosition(tasteAktiv.body, {
				x: tasteAktiv.body.position.x,
				y: 600,
			});

			Matter.Body.applyForce(ball.body, ball.body.position, {
				x: 0.004,
				y: -0.02,
			});
			tasteAktiv = null;
		}
	}
	if (event.keyCode === 32) {
		// reverse gravity
		engine.world.gravity.x *= 0.5;
		// prevent SPACE bar from scrolling page
		event.preventDefault();
	}
}
