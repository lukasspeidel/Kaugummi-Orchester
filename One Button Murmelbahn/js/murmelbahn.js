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
/** @type {Item[]} */ let sensors = [];

let pianosounds = [];
let trompetensounds = [];
let pianoplacing = 600;


/** @type {any} */ let tasteAktiv;

/** @type {Ball} */ let player;

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

function preload() {
	soundFormats("wav");
	pianosounds.push(loadSound("sound/A0-Piano.wav"));
	pianosounds.push(loadSound("sound/D0-Piano.wav"));
	pianosounds.push(loadSound("sound/E0-Piano.wav"));
	pianosounds.push(loadSound("sound/F0-Piano.wav"));
	pianosounds.push(loadSound("sound/G0-Piano.wav"));
	pianosounds.push(loadSound("sound/C0-Piano.wav"));
	pianosounds.push(loadSound("sound/EO-Piano.wav"));
	pianosounds.push(loadSound("sound/F0-Piano.wav"));
	pianosounds.push(loadSound("sound/G0-Piano.wav"));
	pianosounds.push(loadSound("sound/A0-Piano.wav"));
	pianosounds.push(loadSound("sound/B0-Piano.wav"));
	pianosounds.push(loadSound("sound/C1-Piano.wav"));
	pianosounds.push(loadSound("sound/D1-Piano.wav"));
	pianosounds.push(loadSound("sound/E1-Piano.wav"));
	pianosounds.push(loadSound("sound/F1-Piano.wav"));
	pianosounds.push(loadSound("sound/G1-Piano.wav"));
	pianosounds.push(loadSound("sound/A1-Piano.wav"));
	pianosounds.push(loadSound("sound/B1-Piano.wav"));
	pianosounds.push(loadSound("sound/A2-Piano.wav"));
	pianosounds.push(loadSound("sound/B2-Piano.wav"));
	pianosounds.push(loadSound("sound/C2-Piano.wav"));
	pianosounds.push(loadSound("sound/D2-Piano.wav"));
	pianosounds.push(loadSound("sound/E2-Piano.wav"));
	pianosounds.push(loadSound("sound/F2-Piano.wav"));
	pianosounds.push(loadSound("sound/G2-Piano.wav"));
	trompetensounds.push(loadSound("sound/Trompetenton1.wav"));
	trompetensounds.push(loadSound("sound/Trompetenton2.wav"));
}

function drawscreen() {
	let blockcolor = color(100, 255, 0);
	let sensorcolor = color(50, 255, 10, 100);

	player = new Ball(
		world,
		{
			x: 45,
			y: 120,
			r: 20,
			color: "magenta",
		},
		{
			label: "Murmel",
			isStatic: false,
			density: 0.0015,
			restitution: 0.25,
			friction: 0.1,
			frictionAir: 0.0,
		}
	);
	blocks.push(player);

	//Trompete block
	trompete = new Block(
		world,
		{ x: 50, y: 150, w: 150, h: 25, color: "purple" },
		{ isStatic: true, label: "Trompete" }
	);
	blocks.push(trompete);

	trompeteSound = new Block(
		world,
		{ x: 150, y: 150, w: 50, h: 70, color: "red", trigger: (ball, block) => 
		{trompetensounds[Math.floor(Math.random() * 2)].play(); 
		}  },
		{ isStatic: true, label: "TrompeteSound", isSensor: true }
	);	
	sensors.push(trompeteSound);

	//Sensor für keypresses
	sensorTrompete = new Block(world, { x: 250, y: height/2, w: 50, h: 1200, color: "green", trigger: (ball, block) => {movetype = 1}}, 
	{ isStatic: true, label: "SensorTrompete", isSensor: true });
sensors.push(sensorTrompete);
/* 	sensorKeyboard = new Block(world, { x: 2025, y: height/2, w: 50, h: 1200, color: "green", trigger: (ball, block) => {movetype = 2}}, 
	{ isStatic: true, label: "SensorKeyboard", isSensor: true });
sensors.push(sensorKeyboard); */
	
	
	//Boden
	blocks.push(
		new BlockCore(
			world,
			{
				x: width / 2,
				y: 730,
				w: width * 100,
				h: 40,
				color: "red",
			},
			{ angle: radians(0), isStatic: true, friction: 0.0 }
		)
	);

	//Begrenzungen
	begrenzungPiano1 = new Block(world, { x: 1350+pianoplacing, y: 600, w: 40, h: 150, color: "red"}, 
	{ isStatic: true, angle: PI/5});
blocks.push(begrenzungPiano1);
	begrenzungPiano2 = new Block(world, { x: 70+ pianoplacing, y: 600, w: 40, h: 120, color: "red"},
	{ isStatic: true, angle: -PI/5} );
blocks.push(begrenzungPiano2);

	//Tasten weiß
	for (let col = 0; col < 21; col++) {
		for (let row = 0; row < 1; row++) {
			let taste = new Block(
				world,
				{
					x: 120 + pianoplacing+ col * (size + gap),
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
	//Flöte
	let wFlöteunterteilung = 30;
	let hFlöteunterteilung = 30;
	let xFlöteunterteilung = 2200;
	let yFlöteunterteilung = 380;
	let abstandFlöteunterteilung = 70;

	flöteBase = new Block(world, { x: 2200, y: 400, w: 400, h: 20, color: "red" }, { angle: radians(0), isStatic: true, friction: 0.0 });
		blocks.push(flöteBase);
flöteunterteilung1 = new Block(world, { x: xFlöteunterteilung, y: yFlöteunterteilung, w: wFlöteunterteilung, h: hFlöteunterteilung, color: "red" }, 
{ angle: PI/4, isStatic: true, friction: 0.0 });
		blocks.push(flöteunterteilung1);
flöteunterteilung2 = new Block(world, { x: xFlöteunterteilung+abstandFlöteunterteilung, y: yFlöteunterteilung, w: wFlöteunterteilung, h: hFlöteunterteilung, color: "red" }, 
{ angle: PI/4, isStatic: true, friction: 0.0 });	
		blocks.push(flöteunterteilung2);
flöteunterteilung3 = new Block(world, { x: xFlöteunterteilung+abstandFlöteunterteilung*2, y: yFlöteunterteilung, w: wFlöteunterteilung, h: hFlöteunterteilung, color: "red" }, 
{ angle: PI/4, isStatic: true, friction: 0.0 });
		blocks.push(flöteunterteilung3);

		//Tasten schwarz
	for (let col = 0; col < 20; col++) {
		if (col == 2 || col == 6 || col == 9 || col == 13 || col == 16) {
			continue;
		}
		let tastchen = new Block(
			world,
			{
				x: 150 + pianoplacing + col * 60,
				y: 565,
				w: 20,
				h: 40,
				color: "black",
				stroke: "grey",
				restitution: 0.25,
			},
			{ angle: radians(0), isStatic: true, friction: 0.0 }
		);
		blocks.push(tastchen);
	}

}

function setup() {
	let canvas = createCanvas(1280, 720);
	canvas.parent("thecanvas");

	engine = Engine.create();
	world = engine.world;

	rectMode(CENTER);
	ellipseMode(CENTER);

	drawscreen();

	mouse = new Mouse(engine, canvas, {
		stroke: color(random(0, 256), random(0, 256), random(0, 256)),
		strokeWeight: 3,
	});

	mouse.on("startdrag", (/** @type {any} */ _) => {
		mouseIsDragged = true;
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
	const shiftY = 0;

	push();
	translate(shiftX, shiftY);
	background(0);

	blocks.forEach((block) => block.draw());
	sensors.forEach((sensor) => sensor.draw());

	player.draw();

	mouse.draw();
	mouse.setOffset({ x: -shiftX, y: -shiftY });
	pop();
}

//Keypress (movetype)
let movetype = 0;
function keyPressed() {
	if(keyCode === 32){
		switch (movetype) {
		case 0:
			Matter.Body.applyForce(player.body, player.body.position, {
				x: 0.09  ,
				y: 0.0,
			});
			break;
		case 1:
			if (tasteAktiv) {
				Matter.Body.setPosition(tasteAktiv.body, {
					x: tasteAktiv.body.position.x,
					y: 600,
				});
	
				Matter.Body.applyForce(player.body, player.body.position, {
					x: 0.008,
					y: -0.1,
				});
				tasteAktiv = null;
			}
			break;
	}
	}}