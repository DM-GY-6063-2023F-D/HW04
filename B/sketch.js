let mode = 0;

let clickCount,
  clickXSum,
  clickYSum,
  clickXMax,
  clickXMin,
  clickYMax,
  clickYMin;

let bgColor;

function resetCLicks() {
  clickCount = 0;
  clickXSum = 0;
  clickYSum = 0;
  clickXMax = 0;
  clickXMin = width;
  clickYMax = 0;
  clickYMin = height;
}

function drawCircle(x, y) {
  let mDiam = random(30, 120);

  let mColor = random([
    color(255, 215, 0, 100),
    color(71, 143, 128, 100),
    color(139, 0, 0, 100),
    color(55, 75, 152, 100),
  ]);
  fill(mColor);
  stroke(0);
  strokeWeight(1);
  ellipse(x, y, mDiam, mDiam);
}

function drawRing() {
  let mColor = random([
    color(255, 215, 0, 100),
    color(71, 143, 128, 100),
    color(139, 0, 0, 100),
    color(55, 75, 152, 100),
  ]);

  noFill();
  strokeWeight(random([20, 30, 40]));
  stroke(mColor);

  ellipse(
    clickXSum / clickCount,
    clickYSum / clickCount,
    1.5 * max(clickXMax - clickXMin, clickYMax - clickYMin)
  );
}

function drawGrid() {
  let numCols = random([1, 3]);
  let numRows = random([1, 3]);
  let cellWidth = random([10, 20]);
  let rotAngle = random(-PI / 8, PI / 8);

  let x = mouseX - (numCols * cellWidth) / 2;
  let y = mouseY - (numRows * cellWidth) / 2;

  push();
  translate(x, y);
  rotate(rotAngle);

  strokeWeight(1);
  stroke(0);
  stroke(bgColor + 20);
  for (let r = 0; r <= numRows; r += 1) {
    line(-width, r * cellWidth, 2 * width, r * cellWidth);
  }
  for (let c = 0; c <= numCols; c += 1) {
    line(c * cellWidth, -height, c * cellWidth, 2 * height);
  }
  pop();
}

function drawCone() {
  let coneAngle = random(PI / 20, PI / 4);
  let coneRot = random(-PI / 4, PI / 4) + PI / 2;

  let mColor = random([
    color(255, 215, 0, 100),
    color(71, 143, 128, 100),
    color(139, 0, 0, 100),
    color(55, 75, 152, 100),
  ]);

  push();
  translate(mouseX, random(-100, -50));
  rotate(coneRot);
  fill(mColor);
  strokeWeight(1);
  stroke(0);
  arc(0, 0, 3*width, 3*height, -coneAngle / 2, coneAngle / 2);
  pop();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = random([0, 64, 128]);
  background(bgColor);
  resetCLicks();
}

function draw() {}

function mouseClicked() {
  clickCount += 1;
  clickXSum += mouseX;
  clickYSum += mouseY;
  clickXMax = max(clickXMax, mouseX + 30);
  clickXMin = min(clickXMin, mouseX - 30);
  clickYMax = max(clickYMax, mouseY + 30);
  clickYMin = min(clickYMin, mouseY - 30);

  if (mode == 0) {
    let nCircles = random(1, 5);
    for (let c = 0; c < nCircles; c += 1) {
      let mX = mouseX + random(-50, 50);
      let mY = mouseY + random(-50, 50);
      drawCircle(mX, mY);
    }
    if (clickCount % 10 == 0) {
      drawRing();
      resetCLicks();
    }
  } else {
    drawGrid();
    if (clickCount % 5 == 0) {
      drawCone();
      resetCLicks();
    }
  }
}

function keyPressed() {
  if (key == "r") {
    bgColor = random([0, 64, 128]);
    background(bgColor);
    resetCLicks();
  } else if (key == " ") {
    mode = 1 - mode;
    resetCLicks();
  }
}
