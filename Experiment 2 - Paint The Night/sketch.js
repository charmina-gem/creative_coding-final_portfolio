function setup() {
  createCanvas(700, 350);
  background(39, 45, 94);
}

function mouseMoved() {
  // Circle Brush - Blue
  if (keyPressed && key === "a") {
    noStroke();
    fill(13, 32, 112, 15);
    ellipse(mouseX, mouseY, random(50, 100));
  }

  // Circle Brush - Cyan
  if (keyPressed && key === "s") {
    noStroke();
    fill(8, 46, 64, 10);
    ellipse(mouseX, mouseY, random(35, 70));
  }

  // Circle Brush - Randomised Shades of Blue
  if (keyPressed && key === "d") {
    noStroke();
    fill(random(1, 80), random(1, 150), random(1, 255), 10);
    ellipse(mouseX, mouseY, random(50, 60));
  }

  // Rectangle Brush - Randomised Shades of Lighter Aurora
  if (keyPressed && key === "f") {
    noStroke();
    fill (random(25, 200), random(1, 255), random(1, 255), 10);
    rect(mouseX, mouseY, random(20, 100));
  }

  // Code to use the eraser brush.
  if (keyPressed && key === "r") {
    noStroke();
    fill(39, 45, 94);
    ellipse(mouseX, mouseY, random(20, 40));
  }
}

function keyPressed() {
  if (key === "c") {
    // Code to clear the canvas.
    background(39, 45, 94);
  }
  if (key === "x") {
    // Code to stop the current brush.
    noLoop();
  }
}

function mouseClicked() {
  // Small White Star Brush
  if (keyPressed && key === "q") {
    noStroke();
    fill(255, 255, 255);
    star(mouseX, mouseY, 3, 4, 5);
  }
  // Small Pretty Star Brush
  if (keyPressed && key === "w") {
    noStroke();
    fill(random(180, 255), random(180, 255), random(180, 255));
    star(mouseX, mouseY, 3, 10, 6);
  }
  // Sprite Brush
  if (keyPressed && key === "w") {
    noStroke();
    fill(5, 5, 23);
    star(mouseX, mouseY, 3, 4, 5);
  }
  // Small Pretty Star Brush
  if (keyPressed && key === "e") {
    noStroke();
    fill(random(180, 255), random(180, 255), random(180, 255));
    star(mouseX, mouseY, 3, 10, 6);
  }
}

// Star Shape Function

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2;
  beginShape();
  for (let i = 0; i < TWO_PI; i += angle) {
    let starX = x + cos(i) * radius1;
    let starY = y + sin(i) * radius1;
    vertex(starX, starY);
    starX = x + cos(i + halfAngle) * radius2;
    starY = y + sin(i + halfAngle) * radius2;
    vertex(starX, starY);
  }
  endShape(CLOSE);
}
