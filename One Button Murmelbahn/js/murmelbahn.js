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
let floetensounds = [];
let schlagzeugsounds = [];


let pianoplacing = 600;
let hintergrund;
let kaugummi;
let beckenBild;
let Trommel1Bild;
let Trommel2Bild;
let TrompeteBild;
let StänderTrommel1Bild;
let StänderTrommel2Bild;
let StänderBeckenBild;
let DrumstickBild;
let KlavierBild;
let FloeteHintergrundBild;
let FloeteVordergrundBild;
let MuelleimerBild;



/** @type {any} */ let tasteAktiv;

/** @type {Ball} */ let player;

let colorBlocks = "";
let colorSensors = "";

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
	
	floetensounds.push(loadSound("sound/Floetenton1.wav"));
	floetensounds.push(loadSound("sound/Floetenton2.wav"));
	floetensounds.push(loadSound("sound/Floetenton3.wav"));
	floetensounds.push(loadSound("sound/Floetenton4.wav"));

	schlagzeugsounds.push(loadSound("sound/Trommel1.wav"));
	schlagzeugsounds.push(loadSound("sound/Trommel2.wav"));
	schlagzeugsounds.push(loadSound("sound/Becken1.wav"));
	schlagzeugsounds.push(loadSound("sound/Becken2.wav"));
	schlagzeugsounds.push(loadSound("sound/Becken3.wav"));


	//Bilder
	hintergrund = loadImage("bilder/Hintergrund.png");
	kaugummi = loadImage("bilder/Kaugummi.png");
	
	beckenBild = loadImage("bilder/Becken.png");
	Trommel1Bild = loadImage("bilder/Trommel1.png");
	Trommel2Bild = loadImage("bilder/Trommel2.png");
	
	TrompeteBild = loadImage("bilder/Trompete.png");
	
	StänderTrommel1Bild = loadImage("bilder/StänderTrommel1.png");
	StänderTrommel2Bild = loadImage("bilder/StänderTrommel2.png");
	StänderBeckenBild = loadImage("bilder/StänderBecken.png");
	DrumstickBild = loadImage("bilder/Drumstick.png");
	
	KlavierBild = loadImage("bilder/Klavier.png");

	FloeteVordergrundBild = loadImage("bilder/FloeteHintergrundRework.png");
	FloeteHintergrundBild = loadImage("bilder/FloeteVordergrundRework.png");
	
	MuelleimerBild = loadImage("bilder/Muelleimer.png");
}

function drawscreen() {
	let restitutionPlayer = 0.25;	
	let densitiyPlayer = 0.0015;

	player = new Ball(
		world,
		{
			x: 40,
			y: 120,
			r: 20,
			image: kaugummi,
		},
		{
			label: "Murmel",
			isStatic: false,
			density: densitiyPlayer,
			restitution: restitutionPlayer,
			friction: 0.1,
			frictionAir: 0.0,
		}
	);
	

	
//Sensor für keypresses
	sensorTrompete = new Block(world, { x: 250, y: height/2, w: 50, h: 1200, color: colorSensors, trigger: (ball, block) => {movetype = 1}}, 
	{ isStatic: true, label: "SensorTrompete", isSensor: true });
		sensors.push(sensorTrompete);
	sensorKeyboard = new Block(world, { x: 2045, y: height/4, w: 50, h: 480, color: colorSensors, trigger: (ball, block) => {movetype = 2, restitutionPlayer = 0}}, 
	{ isStatic: true, label: "SensorKeyboard", isSensor: true });
		sensors.push(sensorKeyboard);
	
//Trompete block
	trompete = new Block(
		world,
		{ x: 50, y: 150, w: 150, h: 25, color: "" },
		{ isStatic: true, label: "Trompete" }
	);
	blocks.push(trompete);

	trompeteSound = new Block(
		world,
		{ x: 150, y: 150, w: 50, h: 70, color: colorSensors, trigger: (ball, block) => 
		{trompetensounds[0].play(); 
		}  },
		{ isStatic: true, label: "TrompeteSound", isSensor: true }
	);	
	sensors.push(trompeteSound);
//Bild für Trompete
	trompeteBild = new Block(world, { x: 50, y: 170, w: 150, h: 25, color: "", image: TrompeteBild },
	{ isStatic: true, isSensor: true });
	blocks.push(trompeteBild);

//Boden
/* 	blocks.push(
		new BlockCore(
			world,
			{
				x: width / 2,
				y: 730,
				w: width * 100,
				h: 40,
				color: colorBlocks,
			},
			{ isStatic: true, friction: 0.0 }
		)
	); */

//Begrenzungen
	begrenzungPiano1 = new Block(world, { x: 1350+pianoplacing, y: 600, w: 40, h: 180, color: colorBlocks}, 
	{ isStatic: true, angle: PI/5});
blocks.push(begrenzungPiano1);
	begrenzungPiano2 = new Block(world, { x: 70+ pianoplacing, y: 600, w: 40, h: 180, color: colorBlocks},
	{ isStatic: true, angle: -PI/5} );
blocks.push(begrenzungPiano2);

//Reset Sensoren
resetSensorPiano2 = new Block(world, { x: 2100, y: 600, w: 40, h: 400, color: colorSensors, trigger: (ball, block) => {
	Matter.Body.setPosition(player.body, {
		x: 700,
		y: 350,
	});
},}, 
	{ isStatic: true, isSensor: true, angle: PI/5} );
sensors.push(resetSensorPiano2);
	resetSensorPiano1 = new Block(world, { x: 500, y: 600, w: 40, h: 600, color: colorSensors,trigger: (ball, block) => {
		Matter.Body.setPosition(player.body, {
			x: 700,
			y: 350,
		});
	}},
	{ isStatic: true, angle: -PI/5, isSensor: true} );
sensors.push(resetSensorPiano1);

//Flöte
	let xFlöteBase =	2250;
	let yFlöteBase =	400;
	let wFlöteunterteilung = 40;
	let hFlöteunterteilung = 40;
	let xFlöteunterteilung = 2200;
	let yFlöteunterteilung = 385 ;
	let abstandFlöteunterteilung = 85;
	let wFlöteSensor = 70;
	let hFlöteSensor = 10;

	//Bilder Flöte
	flöteBildHinten = new Block(world, { x: xFlöteBase+18, y: yFlöteBase-30, w: 20, h: 20, color: "", image: FloeteVordergrundBild, },
	{ isStatic: true, isSensor: true });
	sensors.push(flöteBildHinten);
	
	flöteBildVorne = new Block(world, { x: xFlöteBase+18, y: yFlöteBase-40, w: 20, h: 20, color: "", image: FloeteHintergrundBild, },
		{ isStatic: true, isSensor: true });
	blocks.push(flöteBildVorne);

	flöteBase = new Block(
		world,
		{ x: xFlöteBase, y: yFlöteBase, w: 530, h: 20, color: colorBlocks },
		{ isStatic: true, friction: 1.5, restitution: 0.0 }
	);
	blocks.push(flöteBase);
	flötemundstück = new Block(
		world,
		{
			x: xFlöteBase - 180,
			y: yFlöteBase - 20,
			w: 140,
			h: 20,
			color: colorBlocks,
		},
		{ angle: PI / 18, isStatic: true, friction: 0.0, restitution: 0.0 }
	);
	blocks.push(flötemundstück);
	flöteunterteilung1 = new Block(
		world,
		{
			x: xFlöteunterteilung,
			y: yFlöteunterteilung,
			w: wFlöteunterteilung,
			h: hFlöteunterteilung,
			color: colorBlocks,
		},
		{ angle: PI / 4, isStatic: true, friction: 0.0, restitution: 0.0 }
	);
	blocks.push(flöteunterteilung1);
	flöteunterteilung2 = new Block(
		world,
		{
			x: xFlöteunterteilung + abstandFlöteunterteilung,
			y: yFlöteunterteilung,
			w: wFlöteunterteilung,
			h: hFlöteunterteilung,
			color: colorBlocks,
		},
		{ angle: PI / 4, isStatic: true, friction: 0.0, restitution: 0.0 }
	);
	blocks.push(flöteunterteilung2);
	flöteunterteilung3 = new Block(
		world,
		{
			x: xFlöteunterteilung + abstandFlöteunterteilung * 2,
			y: yFlöteunterteilung,
			w: wFlöteunterteilung,
			h: hFlöteunterteilung,
			color: colorBlocks,
		},
		{ angle: PI / 4, isStatic: true, friction: 0.0, restitution: 0.0 }
	);
	blocks.push(flöteunterteilung3);

	flötePositionsHalter = new Block(
		world,
		{
			x: xFlöteunterteilung + abstandFlöteunterteilung * 3.5,
			y: yFlöteBase - 10,
			w: wFlöteSensor+30,
			h: hFlöteSensor,
			color: colorBlocks,
},
		{ isStatic: true, angle: -PI / 32, }
	);
	blocks.push(flötePositionsHalter);

	flöteSensor1 = new Block(
		world,
		{
			x: xFlöteunterteilung,
			y: yFlöteunterteilung - 18,
			w: wFlöteSensor,
			h: hFlöteSensor,
			color: colorSensors,
			trigger: (ball, block) => {
				floetensounds[0].play();
			},
		},
		{
			angle: PI / 3,
			isSensor: true,
			label: "flötensensor1",
			isStatic: true,
		}
	);
	sensors.push(flöteSensor1);
	flöteSensor2 = new Block(
		world,
		{
			x: xFlöteunterteilung + abstandFlöteunterteilung,
			y: yFlöteunterteilung - 18,
			w: wFlöteSensor,
			h: hFlöteSensor,
			color: colorSensors,
			trigger: (ball, block) => {
				floetensounds[1].play();
			},
		},
		{
			angle: PI / 3,
			isSensor: true,
			label: "flötensensor2",
			isStatic: true,
		}
	);
	sensors.push(flöteSensor2);
	flöteSensor3 = new Block(
		world,
		{
			x: xFlöteunterteilung + abstandFlöteunterteilung * 2,
			y: yFlöteunterteilung - 18,
			w: wFlöteSensor,
			h: hFlöteSensor,
			color: colorSensors,
			trigger: (ball, block) => {
				floetensounds[2].play();
			},
		},
		{
			angle: PI / 3,
			isSensor: true,
			label: "flötensensor3",
			isStatic: true,
		}
	);
	sensors.push(flöteSensor3);
	flöteSensor4 = new Block(
		world,
		{
			x: xFlöteunterteilung + abstandFlöteunterteilung * 3.5,
			y: yFlöteunterteilung - 18,
			w: wFlöteSensor,
			h: hFlöteSensor,
			color: colorSensors,
			trigger: (ball, block) => {
				floetensounds[3].play();
			},
		},
		{
			angle: PI / 2,
			isSensor: true,
			label: "flötensensor4",
			isStatic: true,
		}
	);
	sensors.push(flöteSensor4);
	sensorFlöteBewegung = new Block(
		world,
		{
			x: xFlöteunterteilung + abstandFlöteunterteilung * 2.5,
			y: yFlöteunterteilung,
			w: wFlöteSensor-40,
			h: hFlöteSensor,
			color: colorSensors,
			trigger: (ball, block) => {
				(movetype = 3),/* Matter.Body.setPosition(player.body, {
					x: xFlöteunterteilung + abstandFlöteunterteilung * 2.5+30,
					y: yFlöteunterteilung,}); */
					(restitutionPlayer = 0.25),
					(densitiyPlayer = 0.25);
			},
		},
		{ isSensor: true, label: "flötensensor4", isStatic: true }
	);
	sensors.push(sensorFlöteBewegung);

	//Schlagzeug
	let xSchlagzeugTrommel = 3020;
	let ySchlagzeugTrommel = 530;
	let wSchlagzeugTrommel = 200;
	let hSchlagzeugTrommel = 100;
	restitutionTrommel1 = 0.5;
	//Trommeln
	schlagzeugTrommel1 = new Block(
		world,
		{
			x: xSchlagzeugTrommel,
			y: ySchlagzeugTrommel-100,
			w: wSchlagzeugTrommel,
			h: hSchlagzeugTrommel,
			color: colorBlocks,
			image: Trommel1Bild,
			trigger: (ball, block) => {
				schlagzeugsounds[0].play();
			},
		},
		{ isStatic: true, friction: 0.0, restitution: 0.5, angle: -PI / 4.5 }
	);
	blocks.push(schlagzeugTrommel1);
	
	schlagzeugTrommel1Stopper = new Block(
		world,
		{
			x: xSchlagzeugTrommel+30,
			y: ySchlagzeugTrommel-100+40,
			w: wSchlagzeugTrommel+10,
			h: hSchlagzeugTrommel+80,
			color: colorBlocks,
		},
		{ isStatic: true, friction: 0.0,  angle: -PI / 4.5 }
	);
	blocks.push(schlagzeugTrommel1Stopper);

	schlagzeugTrommel2 = new Block(
		world,
		{
			x: xSchlagzeugTrommel - 180,
			y: ySchlagzeugTrommel + 50,
			w: wSchlagzeugTrommel,
			h: hSchlagzeugTrommel,
			color: colorBlocks,
			image: Trommel2Bild,
			trigger: (ball, block) => {
				schlagzeugsounds[1].play();
			},
		},
		{ isStatic: true, friction: 0.0, restitution: 0.5, angle: PI / 4 }
	);
	blocks.push(schlagzeugTrommel2);
	
	let xBecken = xSchlagzeugTrommel + 170;
	let yBecken = ySchlagzeugTrommel - 350;
	let wBecken = 200;
	let hBecken = 10;

	//Drumsticks
	drumstick1 = new Block(
		world,
		{
			x: xBecken+65,
			y: yBecken-20,
			w: 80,
			h: 5,
			color: "",
			image: DrumstickBild,
		},
		{ density: 0.00003, friction: 5, frictionAir: 0.0001, frictionStatic: 1.5 }
	);
	blocks.push(drumstick1);
	drumstick2 = new Block(
		world,
		{
			x: xBecken+65,
			y: yBecken-10,
			w: 80,
			h: 5,
			color: "",
			image: DrumstickBild,
		},
		{ density: 0.00003, friction: 5, frictionAir: 0.0001, frictionStatic: 1.5 }
	);
	blocks.push(drumstick2);

	stopperDrumsticks = new Block(
		world,
		{
			x: xBecken+115,
			y: yBecken+45,
			w: 20,
			h: 50,
			color: "",
		},
		{ isStatic: true }
	);
	blocks.push(stopperDrumsticks);

	//Becken
	becken = new Block(
		world,
		{
			x: xBecken,
			y: yBecken,
			w: wBecken,
			h: hBecken,
			image: beckenBild,
			color: "",
			trigger: (ball, block) => {
				schlagzeugsounds[3].play();
				restitutionTrommel1 = 1.2;
			},
		},
		{ label: "becken", restitution: 0 }
	);
	becken.constrainTo(null, { stiffness: 1, length: 0 });
	blocks.push(becken);


	beckenSpacer1 = new Block(
		world,
		{
			x: xBecken-30,
			y: yBecken-80,
			w: 10,
			h: 50+70,
			color: "",
		},
		{ isStatic: true }
	);
	blocks.push(beckenSpacer1);

	beckenSpacer2 = new Block(
		world,
		{
			x: xBecken+50,
			y: yBecken+50,
			w: 10,
			h: 50,
			color: "",
		},
		{ isStatic: true }
	);
	blocks.push(beckenSpacer2);

	beckenSpacer3 = new Block(
		world,
		{
			x: xBecken-50,
			y: yBecken+50,
			w: 10,
			h: 50,
			color: "",
		},
		{ isStatic: true }
	);
	blocks.push(beckenSpacer3);
	
	//Bild Becken Ständer
	bildStänderBecken = new Block(
		world,
		{
			x: xBecken+35,
			y: yBecken+375,
			w: 20,
			h: 50,
			color: "",
			image: StänderBeckenBild,
		},
		{ isStatic: true, isSensor: true }
	);
	sensors.push(bildStänderBecken);
	//Bild Trommel Ständer
	bildStänderTrommel1 = new Block(
		world,
		{
			x: xSchlagzeugTrommel+35,
			y: ySchlagzeugTrommel+101,
			w: 20,
			h: 50,
			color: "",
			image: StänderTrommel1Bild,
		},
		{ isStatic: true, isSensor: true }
	);
	sensors.push(bildStänderTrommel1);
	

	bildStänderTrommel2 = new Block(
		world,
		{
			x: xSchlagzeugTrommel - 200,
			y: ySchlagzeugTrommel + 220,
			w: 20,
			h: 50,
			color: "grey",
			image: StänderTrommel2Bild,
		},
		{ isStatic: true, isSensor: true }
	);
	sensors.push(bildStänderTrommel2);
	//Mülleimer

	muelleimer = new PolygonFromSVG(world,
		{ x: xSchlagzeugTrommel, y: ySchlagzeugTrommel+200, fromFile: 'vectors/Muelleimer.svg', color: "colorBlocks", scale: 0.3, color:"" },
		{ isStatic: true, friction: 0.0}
	  );
	blocks.push(muelleimer);

	bildMuelleimer = new Block(
		world,
		{
			x: xSchlagzeugTrommel,
			y: ySchlagzeugTrommel+160,
			w: 20,
			h: 50,
			color: "",
			image: MuelleimerBild,
		},
		{ isStatic: true, isSensor: true }
	);
	sensors.push(bildMuelleimer);

//Bild Klavier
	bildKlavier = new Block(
	world,
	{
		x: 1310,
		y: 625,
		w: 20,
		h: 50,
		color: "grey",
		image: KlavierBild,
	},
		{ isStatic: true, isSensor: true }
	);
	sensors.push(bildKlavier);
	//Klavier
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
	background(hintergrund);
	
	sensors.forEach((sensor) => sensor.draw());
	player.draw();
	blocks.forEach((block) => block.draw());


	mouse.draw();
	mouse.setOffset({ x: -shiftX, y: -shiftY });
	pop();
}

//Keypress (movetype)
let movetype = 0;
function keyPressed() {
	if(keyCode === 32){
		switch (movetype) {
			//Trompete
		case 0:
			Matter.Body.applyForce(player.body, player.body.position, {
				x: 0.09  ,
				y: 0.0,
			});
			break;
			//Klavier
		case 1:
			if (tasteAktiv) {
				Matter.Body.setPosition(tasteAktiv.body, {
					x: tasteAktiv.body.position.x,
					y: 600,
				});
	
				Matter.Body.applyForce(player.body, player.body.position, {
					x: 0.009,
					y: -0.105,
				});
				tasteAktiv = null;
			}
			break;
			//Flöte (Loch zu Loch)
		case 2:
			Matter.Body.applyForce(player.body, player.body.position, {
				x: 0.0078,
				y: -0.07 ,
			});
			break;
			//Flöte (rausschießen)
		case 3:
			Matter.Body.applyForce(player.body, player.body.position, {
				x: 0.15,
				y: 0.0,
			});

			

}
	}}