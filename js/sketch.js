
paper.install(window);

var angularLogo, svg, parent, canvas, rInner, rOuter;
var raysOuter = [];
var raysMiddle = [];
var raysInner = [];

window.onload = function() {
  // Setup Paper.js
  paper.setup('angular-sun');
  svg = document.getElementById('svg');
  canvas = document.getElementById('angular-sun');
  parent = document.body;
  init();

  // Animate
  paper.view.onFrame = function(event) {
    animateRays(raysOuter, event.time, 0);
    animateRays(raysMiddle, event.time, 1);
    animateRays(raysInner, event.time, 2);
  };
};

var init = function() {
  project.clear();

  // Resize View
  var w = parent.offsetWidth;

  // reload svg
  svg.style.display = 'block';
  angularLogo = project.importSVG(svg);
  svg.style.display = 'none';

  // Center logo
  angularLogo.position = view.center;

  // Pick scale based on viewport size
  var scale = w >= 640 ? 2 : 1;

  // Size animation
  angularLogo.scale(scale, view.center);
  rInner = 62.5*scale;
  rOuter = [112.5*scale, 100*scale, 75*scale];

  // Build Rays
  buildRaysOuter();
  buildRaysMiddle();
  buildRaysInner();

  // Draw!
  paper.view.draw();
};


window.onresize = init;


var animateRays = function(rays, t, index) {
  for (var i = 0; i < rays.length; i++) {
    var s = rays[i].segments[1];
    var theta = rays[i]._a * Math.PI/180;

    var sinus = 10 * Math.sin(t*3 + i);
    var k = new Point(view.center.x, view.center.y - (rOuter[index] + sinus));

    s.point = k.rotate(rays[i]._a, view.center);
  }
};


var buildRaysOuter = function() {
  for (var i = 0; i < 4; i++) {
    var p = new Path({
      segments: [
        [view.center.x - 2, view.center.y - rInner],
        [view.center.x, view.center.y - rOuter[0]],
        [view.center.x + 2, view.center.y - rInner]
      ],
      fillColor: 'black',
    });

    p.rotate(360 * (i+1) / 4, view.center);
    p._a = 360 * (i+1) / 4;

    raysOuter.push(p);
  };
};


var buildRaysMiddle = function() {
  for (var i = 0; i < 24; i++) {
    if ([0, 90, 180, 270, 360].indexOf(360 * (i+1) / 24) === -1) {

      var p = new Path({
        segments: [
          [view.center.x - 1, view.center.y - rInner],
          [view.center.x, view.center.y - rOuter[1]],
          [view.center.x + 1, view.center.y - rInner]
        ],
        fillColor: 'black'
      });

      p.rotate(360 * (i+1) / 24, view.center);
      p._a = 360 * (i+1) / 24;

      raysMiddle.push(p);
    }
  };
};


var buildRaysInner = function() {
  for (var i = 0; i < 120; i++) {
    if ([0, 90, 180, 270, 360].indexOf(360 * (i+1) / 120) === -1) {

      var p = new Path({
        segments: [
          [view.center.x - 0.5, view.center.y - rInner],
          [view.center.x, view.center.y - rOuter[2]],
          [view.center.x + 0.5, view.center.y - rInner]
        ],
        fillColor: 'black'
      });

      p.rotate(360 * (i+1) / 120, view.center);
      p._a = 360 * (i+1) / 120;

      raysInner.push(p);
    }
  };
};