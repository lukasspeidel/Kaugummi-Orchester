const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;
// the Matter engine to animate the world
let engine;
let world;
let mouse;
let ball;
let isDrag = false;
// an array to contain all the blocks created
let blocks = [];
let floeteImg;
let draggedBody;
let useSpace = true;
let magnets = [];
let active = 0;
let ground;
let wallpaper;
/* function preload() {
  floeteImg = loadImage("./img/box.png");
  wallpaper = loadImage("../img/Background.png")
} */
// preload
// setup
// draw
function setup() {
  let canvas = createCanvas(1280, 720);
  rectMode(CENTER);
  ellipseMode(CENTER);
  engine = Engine.create();
  world = engine.world;
  blocks.push(new BlockCore(world, { x: windowWidth / 2, y: 800, w: windowWidth, h: 40, color: "gray" }, { isStatic: true }));
  blocks.push(new BlockCore(world, { x: -100, y: 450, w: 800, h: 10, color: "gray" }, { angle: PI / 3, isStatic: true }));
  blocks.push(new BlockCore(world, { x: windowWidth + 100, y: 450, w: 800, h: 10, color: "gray" }, { angle: -PI / 3, isStatic: true }));
  blocks.push(new BlockCore(
    world, {
    x: 600,
    y: 600,
    w: 400,
    h: 30,
    color: "red",
    trigger: (murmel, block) => {
      console.log("HIT")
    }
  }, { isStatic: true }
  ));
  blocks.push(new BlockCore(
    world, {
    x: 525,
    y: 600,
    w: 5,
    h: 80,
    color: "red",
    trigger: (murmel, block) => {
      console.log("HIT")
    }
  }, { isStatic: true }
  ));
  blocks.push(new BlockCore(
    world, {
    x: 575,
    y: 600,
    w: 5,
    h: 80,
    color: "red",
    trigger: (murmel, block) => {
      console.log("HIT")
    }
  }, { isStatic: true }
  ));
  blocks.push(new BlockCore(
    world, {
    x: 625,
    y: 600,
    w: 5,
    h: 80,
    color: "red",
    trigger: (murmel, block) => {
      console.log("HIT")
    }
  }, { isStatic: true }
  ));
  blocks.push(new BlockCore(
    world, {
    x: 675,
    y: 600,
    w: 5,
    h: 80,
    color: "red",
    trigger: (murmel, block) => {
      console.log("Test")
    }
  }, { isStatic: true }
  ));
  ground = new BlockCore(world, {
    x: 1280 / 2,
    y: 720,
    w: 1280 * 7,
    h: 80,
    color: "white",
  }, { isStatic: true });
  blocks.push(ground)
  blocks.push(new PolygonFromSVG(
    world, {
    x: 400,
    y: 400,
    fromFile: "./img/ecke3.svg",
    scale: 0.6,
    color: "white",
    image: floeteImg,
    stroke: 128,
    // angle: -PI / 3
  }, { isStatic: true, friction: 0.0 }
  ));
  // the ball has a label and can react on collisions
  ball = new Ball(
    world, {
    x: 400,
    y: 100,
    r: 15,
    color: "magenta"
  }, { label: "Murmel", restitution: 0.0, density: 0.001 }
  )
  blocks.push(ball);
  console.log(ball.attributes.r);
  for (let d = 0; d < 5; d++) {
    let magnet = new Magnet(
      world, {
      x: 500 + d * 50,
      y: 600,
      r: 10,
      color: "blue",
      attraction: 0.45e-4
    }, { isStatic: true }
    );
    blocks.push(magnet);
    magnet.addAttracted(ball.body);
    magnets.push(magnet);
  }
  // add a mouse so that we can manipulate Matter objects
  mouse = new Mouse(engine, canvas, { stroke: "blue", strokeWeight: 3 });
  // const mouseScale = 1 + (1 / (scale / (1 - scale)))
  // Mouse.setScale(mouse, { x: mouseScale, y: mouseScale });
  // process mouseup events in order to drag objects or add more balls
  mouse.on("startdrag", evt => {
    isDrag = true;
    draggedBody = evt.body;
    // console.log(evt);
  });
  mouse.on("mouseup", evt => {
    // if (!isDrag) {
    //   let ball = new Ball(world, { x: evt.mouse.position.x, y: evt.mouse.position.y, r: 15, color: ‘yellow’ }, { isStatic: false, restitution: 0.9, label: ‘Murmel’ });
    //   blocks.push(ball);
    // }
    isDrag = false;
  });
  // process collisions - check whether block “Murmel” hits another Block
  Events.on(engine, "collisionStart", (event) => {
    var pairs = event.pairs;
    pairs.forEach((pair, i) => {
      if (pair.bodyA.label == "Murmel") {
        pair.bodyA.plugin.block.collideWith(pair.bodyB.plugin.block)
      }
      if (pair.bodyB.label == "Murmel") {
        pair.bodyB.plugin.block.collideWith(pair.bodyA.plugin.block)
      }
    })
  });
  // run the engine
  Runner.run(engine);
  document.addEventListener("keydown", onKeyDown)
}
function onKeyDown(event) {
  switch (event.key) {
    case "":
      console.log("SPACE");
      event.preventDefault();
      if (active < magnets.length - 1) {
        active++;
        Matter.Body.applyForce(ball.body, ball.body.position, { x: 0.0, y: -0.03 })
      }
      break;
    default:
      console.log(event.key);
  }
}
let first = true;
function draw() {
  background(0);
  const shiftX = -ball.body.position.x + width / 2;
  fill("white")
  push()
  background(0, 10);
  push()
  translate(shiftX * .1, 0)
  rect(500, 500, 100, 100)
  pop()
  translate(shiftX, 0)
  blocks.forEach(block => block.draw());
  mouse.draw();
  pop()
  // animate attracted blocks
  magnets[active].attract();
}
let i = 0;
function keyPressed() {
  // is SPACE pressed and character touching a surface?
  if (keyCode === 32) {
    let direction = 1;
    if (i === 4) {
      // magnet muss aus sein
      console.log(blocks[blocks.length - 1].attracted);
      // deleteAttribute(blocks[blocks.length - 1], “attracted”);
      // blocks[blocks.length - 1].attracted.length = 0;
      blocks[blocks.length - 1].attracted.pop();
      Matter.Body.applyForce(ball.body, ball.body.position, {
        x: 0.1,
        y: -0.1,
      });
    } else {
      Matter.Body.applyForce(ball.body, ball.body.position, {
        x: 0.01 / 6,
        y: 0.0,
      });
      i++;
      console.log(i);
    }
  }
}