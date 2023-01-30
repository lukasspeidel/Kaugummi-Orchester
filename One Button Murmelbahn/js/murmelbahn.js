/** @typedef { BlockCore | Block | Ball | Chain | Magnet | Parts | Polygon | PolygonFromPoints | PolygonFromSVG | Stack } Item */

Matter.use("matter-wrap");
const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Events = Matter.Events;
const World = Matter.World;

/** @type {Matter.Engine} */ let engine;
/** @type {Matter.World} */ let world;
/** @type {Mouse} */ let mouse;
let mouseIsDragged = false;
// an array to contain all the blocks created
/** @type {Item[]} */ let blocks = [];
let pianosounds = [];

/** @type {any} */ let tasteAktiv;

/** @type {Ball} */ let player;

function preload() {
	soundFormats("wav");
	/* pianosounds.push(loadSound("sound/A0-Piano-Final.wav"));
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
	pianosounds.push(loadSound("sound/A1-Piano-Final.wav"));
	pianosounds.push(loadSound("sound/B1-Piano-Final-.wav"));
	pianosounds.push(loadSound("sound/C2-Piano-Final.wav"));
	pianosounds.push(loadSound("sound/D2-Piano-Final.wav"));
	pianosounds.push(loadSound("sound/E2-Piano-Final-.wav"));
	pianosounds.push(loadSound("sound/F2-Piano-Final-.wav"));
	pianosounds.push(loadSound("sound/G2-Piano-Final.wav"));
	pianosounds.push(loadSound("sound/sound_A2-Piano-Final (1).wav"));
	pianosounds.push(loadSound("sound/sound_B2-Piano-Final (1).wav")); */
}

function setup() {
	let canvas = createCanvas(1280, 720);
	canvas.parent("thecanvas");

	engine = Engine.create();
	world = engine.world;

	rectMode(CENTER);
	ellipseMode(CENTER);

	//Boden
	blocks.push(
		new BlockCore(
			world,
			{
				x: width / 2,
				y: 730,
				w: 1280 * 2,
				h: 40,
				color: "red",
			},
			{ angle: radians(0), isStatic: true, friction: 0.0 }
		)
	);

	player = new Ball(
		world,
		{
			x: 115,
			y: 220,
			r: 20,
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

	mouse = new Mouse(engine, canvas, {
		stroke: color(random(0, 256), random(0, 256), random(0, 256)),
		strokeWeight: 3,
	});

	mouse.on("startdrag", (/** @type {any} */ _) => {
		mouseIsDragged = true;
	});

	mouse.on("mouseup", (/** @type {any} */ e) => {
		if (!mouseIsDragged) {
			let ball = new Ball(
				world,
				{
					x: e.mouse.position.x,
					y: e.mouse.position.y,
					r: 15,
					color: "yellow",
				},
				{ isStatic: false, restitution: 1, label: "Murmel" }
			);
			Body.applyForce(blocks[0].body, blocks[0].body.position, {
				x: 0,
				y: 2,
			});
			blocks.push(ball);
		}
		mouseIsDragged = false;
	});
	mouse.mouse.pixelRatio = pixelDensity();

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
	// run the engine
	Runner.run(engine);
}

function draw() {
	Engine.update(engine);
	const shiftX = -player.body.position.x + width / 2;
	const shiftY = -player.body.position.y + height / 2;

	push();
	translate(shiftX, shiftY);
	background(0);

	blocks.forEach((block) => block.draw());
	player.draw();

	mouse.draw();
	mouse.setOffset({ x: -shiftX, y: -shiftY });
	pop();
}

/* function keyPressed() {
	if (keyCode === 32) {
		// let swingY = height / 2 + sin(frameCount * 0.15) * 30;
		if (tasteAktiv) {
			Matter.Body.setPosition(tasteAktiv.body, {
				x: tasteAktiv.body.position.x,
				y: 600,
			});

			Matter.Body.applyForce(player.body, player.body.position, {
				x: 0.004,
				y: -0.02,
			});
			tasteAktiv = null;
		}
	}
} */
