let mode = 1;
let starSpacing = 18, starSize = 6;
let baseAngle = 0;
let ang1 = 0, ang2 = 0;

function setup() {
  createCanvas(800, 800);
}

function keyPressed() {
  if (key === "1") mode = 1;
  if (key === "2") mode = 2;
  if (key === "3") mode = 3;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  if (mode === 1) drawStars();
  else if (mode === 2) drawWaves();
  else drawMoire();
}

// MODE 1
function drawStars() {
  colorMode(RGB, 255);
  noStroke();
  blendMode(BLEND);
  background(12, 10, 30);
  let t = frameCount;
  blendMode(SCREEN);
  drawStarLayer(
    noise(t / 260) * TAU,
    1,
    140 + 40 * noise(t / 80),
    130 + 40 * noise(t / 80, 5),
    220,
    180
  );
  drawStarLayer(
    noise(t / 460, 9) * TAU,
    1.2,
    100 + 40 * noise(t / 60, 9),
    100 + 40 * noise(t / 60, 14),
    210,
    160
  );
  drawStarLayer(
    noise(t / 380, 99) * TAU,
    1.2,
    180,
    170 + 30 * noise(t / 40, 99),
    255,
    140
  );
}

function drawStarLayer(angle, scl, r, g, b, a) {
  push();
  fill(r, g, b, a);
  translate(width / 2, height / 2);
  rotate(angle);
  scale(scl);
  translate(-width / 2, -height / 2);
  for (let x = 0; x < width; x += starSpacing)
    for (let y = 0; y < height; y += starSpacing) drawStar(x, y, starSize);
  pop();
}

function drawStar(x, y, size) {
  beginShape();
  for (let i = 0; i < 10; i++) {
    let a = (i / 10) * TAU;
    let rad = i % 2 === 0 ? size : size * 0.4;
    vertex(x + cos(a) * rad, y + sin(a) * rad);
  }
  endShape(CLOSE);
}

// MODE 2
function drawWaves() {
  colorMode(HSB, 360, 100, 100, 1);
  noFill();
  strokeWeight(1.2);
  blendMode(BLEND);
  let t = millis() * 0.001;
  let spacing = lerp(4, 12, 0.5 + 0.5 * sin(t * 0.25));
  let freq = map(mouseX, 0, width, 0.008, 0.035, true);
  let amp = map(mouseY, 0, height, 12, 2, true);
  let offX = map(mouseX, 0, width, -spacing * 1.2, spacing * 1.2);
  let offY = map(mouseY, 0, height, -spacing * 1.2, spacing * 1.2);
  let delta = 0.02 + 0.015 * sin(t * 0.7);
  background(240, 30, 10);
  drawWaveSheet(
    baseAngle,
    0,
    0,
    spacing,
    amp,
    freq,
    t,
    color(240, 55, 90, 0.65)
  );
  drawWaveSheet(
    baseAngle + delta,
    offX,
    offY,
    spacing,
    amp,
    freq,
    t + 0.7,
    color(265, 45, 95, 0.55)
  );
}

function drawWaveSheet(angle, ox, oy, spacing, amp, freq, t, col) {
  let D = sqrt(width * width + height * height);
  push();
  translate(width / 2, height / 2);
  rotate(angle);
  translate(ox, oy);
  stroke(col);
  for (let y = -D; y <= D; y += spacing) {
    let phase = t * 1.2 + y * 0.003;
    beginShape();
    for (let x = -D; x <= D; x += 6) vertex(x, y + sin(x * freq + phase) * amp);
    endShape();
  }
  pop();
}

// MODE 3
function drawMoire() {
  colorMode(RGB, 255);
  blendMode(BLEND);
  background(0, 40);
  noFill();
  strokeWeight(1.2);
  push();
  translate(width / 2, height / 2);
  for (let r = 0; r < 8; r++) {
    for (let i = 0; i < 60; i++) {
      let base = (TWO_PI / 60) * i;
      let x1 = cos(base + ang1 * (1 + r * 0.15)) * (30 + r * 32);
      let y1 = sin(base + ang1 * (1 + r * 0.15)) * (30 + r * 32);
      let x2 = cos(base + ang2 * (1 - r * 0.12)) * (30 + r * 32);
      let y2 = sin(base + ang2 * (1 - r * 0.12)) * (30 + r * 32);
      stroke(200, 210, 255, 200);
      line(x1, y1, x2, y2);
      stroke(255, 240, 180, 120);
      line(x1, y1, x1 + cos(base + 1) * 10, y1 + sin(base + 1) * 10);
    }
  }
  stroke(255, 255, 200, 180);
  for (let i = 0; i < 5; i++) {
    let a = (TWO_PI / 5) * i + ang1 * 2;
    line(cos(a) * 10, sin(a) * 10, cos(a) * 260, sin(a) * 260);
  }
  pop();
  ang1 += 0.0017;
  ang2 += 0.0011;
}