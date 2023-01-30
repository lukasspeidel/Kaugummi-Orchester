Matter.use("matter-wrap");
const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;

// the Matter engine to animate the world
let engine;
let world;
let mouse;
let isDrag = false;
// an array to contain all the blocks created
let blocks = [];

let propeller;
let angle = 0;

let poly, ballImg, blockImg;
let magnet;

//Lukas
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
//Emi
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
/* let blocks = []; */
let trap;

//Sounds
let pianosounds = [];


function preload() {
	soundFormats("wav");
	pianosounds.push(loadSound("sound/A0-Piano-Final.wav"));
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
/* 	pianosounds.push(loadSound("sound/sound_A2-Piano-Final (1).wav"));
	pianosounds.push(loadSound("sound/sound_B2-Piano-Final (1).wav")); */
}

function setup() {
  let canvas = createCanvas(3000, 720);
  canvas.parent('thecanvas');

  engine = Engine.create();
  world = engine.world;

  canvasElem = document.getElementById("thecanvas");
  engine.world.gravity.x *= 0.5;
	//EMI
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
  

  
  //LUKAS
  	//becken 
	becken = new Block(world, { x: 600+plusTest, y: 320, w: 200, h: 8, color: 'white' },{label: "becken" });
	// add constraint for becken
		becken.constrainTo(null, { stiffness: 1, length: 0 });
  
	// becken spacer for limit
		beckenSpacer1 = new Block(world, { x: 630+plusTest, y: 265, w: 35, h: 50, color: 'white' }, {isStatic: true });
		  
	   beckenSpacer2 = new Block(world, { x: 675+plusTest, y: 365, w: 20, h: 50, color: 'pink' }, {isStatic: true });
 
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
	trampolineGreen = new Block(
		world,
		{ x: 50+plusTest, y: 500, w: 150, h: 75, color: "green", trigger: (ball, block) => {
			// console.log("Trigger ", ball, block, Trommel1);
			trommel1.play();	
		  } },
		{ isStatic: true, restitution: 1.1, angle: 10, label:"TrampolineGreen" }
	);

	trampolineRed = new Block(
		world,
		{ x: 450+plusTest, y: 500, w: 150, h: 75, color: "red" },
		{ isStatic: true, restitution: 1.8, angle: 50, label: "TrampolineRed" }
	);
	//MEIN STUFF ENDE
  // add a mouse so that we can manipulate Matter objects
  mouse = new Mouse(engine, canvas, { stroke: 'blue', strokeWeight: 3 });

  // process mouseup events in order to drag objects or add more balls
  mouse.on("startdrag", evt => {
    isDrag = true;
  });
  mouse.on("mouseup", evt => {
    if (!isDrag) {
      let ball = new Ball(world, { x: evt.mouse.position.x, y: evt.mouse.position.y, r: 15, color: 'yellow' }, { isStatic: false, restitution: 0.9, label: 'Murmel' });
      blocks.push(ball);
    }
    isDrag = false;
  });



  // process collisions - check whether block "Murmel" hits another Block
  Events.on(engine, 'collisionStart', function (event) {
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
  // run the engine
  Runner.run(engine);
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
  background(0, 20);
  mouse.draw();
  //EMI
  clear();
	blocks.forEach((block) => block.draw());
	tasten.forEach((block) => block.draw());
	// taste.draw();
	tastchen.forEach((block) => blockdraw());

	// position canvas and translate coordinates
	scrollEndless(ball.body.position);



  //LUKAS
	trampolineGreen.draw();
	trampolineRed.draw();
	becken.draw();
	becken.drawConstraints();
	beckenSpacer1.draw();
	beckenSpacer2.draw();
	drumstick1.draw();
	drumstick2.draw();
	trompete.draw();
	trompeteSound.draw();
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
