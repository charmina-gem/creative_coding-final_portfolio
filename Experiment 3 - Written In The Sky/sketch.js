var sky_colors = [
  // Dawn Colors Set
  [
    [245, 210, 190],
    [200, 170, 220],
    [100, 140, 200],
    [240, 220, 170],
    [180, 210, 235],
    [255, 240, 210],
  ],
  // Dusk Colors Set
  [
    [80, 60, 120],
    [140, 90, 160],
    [210, 140, 160],
    [240, 190, 160],
    [100, 130, 190],
    [220, 200, 240],
  ],
  // Midday Colors Set
  [
    [170, 200, 230],
    [200, 230, 240],
    [240, 210, 180],
    [220, 170, 160],
    [150, 180, 220],
    [245, 225, 200],
  ],
  // Twilight Colors Set
  [
    [30, 40, 90],
    [60, 80, 150],
    [100, 60, 130],
    [180, 100, 120],
    [220, 160, 130],
    [240, 220, 200],
  ],
];

var tileWidth = 8;
var tileHeight = 16;
let palette, cols, rows, blockList;

function setup() {
  createCanvas(400, 400);
  noLoop();
  palette = random(sky_colors);
  cols = width / tileWidth;
  rows = height / tileHeight;
}

function draw() {
  background(20, 20, 50);
  drawTiles();
  drawBlocks(floor(random(5, 12)));
  drawStars();
}

// Background Tiles
function drawTiles() {
  stroke(255, 255, 255, 30);
  strokeWeight(0.4);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let c = random(palette);
      fill(c[0], c[1], c[2]);
      rect(i * tileWidth, j * tileHeight, tileWidth, tileHeight);
    }
  }
}

// Bigger Overlapping Blocks
function drawBlocks(num) {
  for (let i = 0; i < num; i++) {
    let x = floor(random(cols)) * tileWidth;
    let y = floor(random(rows)) * tileHeight;
    let bw = min(floor(random(3, 14)) * tileWidth, width - x);
    let bh = min(floor(random(3, 14)) * tileHeight, height - y);
    let c = palette[i % palette.length];
    fill(c[0], c[1], c[2]);
    stroke(255, 255, 255, 90);
    strokeWeight(2.5);
    rect(x, y, bw, bh);
  }
}

// Stars Function
function drawStars() {
  noStroke();
  for (let i = 0; i < 28; i++) {
    fill(255, 255, 240, random(80, 200));
    ellipse(random(width), random(height), random(1, 2.5), random(1, 2.5));
  }
}
