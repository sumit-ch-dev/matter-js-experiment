import "./styles.css";
import Matter, {
  World,
  Engine,
  Bodies,
  Mouse,
  MouseConstraint,
  Runner,
  Render
} from "matter-js";

// Canvas setup
var canvas = document.getElementById("world");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function percentX(percent) {
  return Math.round((percent / 100) * canvas.width);
}
function percentY(percent) {
  return Math.round((percent / 100) * canvas.height);
}
// End Canvas

// Setup Engine, World, Runner and Render
var engine = Engine.create();
var world = engine.world;
var runner = Runner.create();
var render = Render.create({
  element: canvas,
  engine: engine,
  options: {
    wireframes: false,
    // showBounds: true,
    // hasBounds: true,
    width: percentX(100),
    height: percentY(100),
    background: "#FFFFFF"
  }
});
Runner.run(runner, engine);
Render.run(render);
// End Setup

// Add walls
World.add(world, [
  //Walls
  Bodies.rectangle(0, 0, percentX(canvas.width), 50, { isStatic: true }),
  Bodies.rectangle(0, 0, 50, percentX(canvas.height), { isStatic: true }),
  Bodies.rectangle(0, percentY(100), percentX(canvas.width), 50, {
    isStatic: true
  }),
  Bodies.rectangle(percentX(100), percentY(100), 50, percentX(canvas.height), {
    isStatic: true
  })
]);
// End Walls

// Gravity
engine.world.gravity.y = 8;

// Bodies
var mouseBody = Matter.Bodies.circle(0, 0, 100);
World.add(world, [mouseBody]);

// Setup mouse constraints
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      render: {
        visible: false
      }
    }
  });
Matter.World.add(world, mouseConstraint);

// Constraints to mouse
var con = Matter.Constraint.create({
  pointA: mouse.position,
  bodyB: (mouseConstraint.body = mouseBody),
  render: {
    visible: false
  }
});
Matter.World.add(world, con);
render.mouse = mouse;
