let SEC_DIAM;

function setup() {
  createCanvas(windowWidth, windowHeight);
  SEC_DIAM = min(width, height) * 0.75;
}

function drawSeason(nowMonth) {
  if (nowMonth < 3 || nowMonth > 11) {
    // winter
    background(0);
  } else if (nowMonth < 6) {
    // spring
    background(64);
  } else if (nowMonth < 9) {
    // summer
    background(128);
  } else if (nowMonth < 12) {
    // autumn
    background(64);
  }
}

function drawHours(nowHour) {
  let hourAngleWidth = map(nowHour % 12, 0, 11, PI / 20, PI / 2);
  let hourAngleStart = (PI - hourAngleWidth) / 2;
  let hourAngleEnd = (PI + hourAngleWidth) / 2;

  let hourX = random(0, width);
  let hourY = random(-height / 4, 0);
  let hourRotate = random(-PI / 4, PI / 4);

  let hourColor = random([
    color(255, 215, 0, 100),
    color(71, 143, 128, 100),
    color(139, 0, 0, 100),
    color(55, 75, 152, 100),
  ]);

  push();
  translate(hourX, hourY);
  rotate(hourRotate);
  fill(hourColor);
  stroke(0);
  arc(0, 0, 4 * width, 4 * height, hourAngleStart, hourAngleEnd, PIE);
  pop();
}

function drawMinutes(nowMinute) {
  let minuteStartX = random(50, width - 50);
  let minuteStartY = random(50, height / 3);
  let minuteRotate = random(-PI / 6, PI / 6);
  let minuteNumColumns = random([6, 10, 12, 15, 20]);
  let minuteNumRows = floor(nowMinute / minuteNumColumns) + 1;
  let minuteHeight = (height - minuteStartY) / minuteNumRows / 3;

  push();
  translate(minuteStartX, minuteStartY);
  rotate(minuteRotate);

  strokeWeight(1);
  for (let row = 0; row < minuteNumRows; row += 1) {
    let mY = row * minuteHeight;
    stroke(0);
    line(-width, mY, 2 * width, mY);

    let minLeft = nowMinute - row * minuteNumColumns;
    let colMax = min(minLeft, minuteNumColumns);

    for (let col = 0; col < colMax; col += 1) {
      let mX = col * minuteHeight;
      let minuteSecondColor = random([0, 100, 255, "gold", "pink", "darkred"]);
      fill(minuteSecondColor);
      rect(mX, mY, minuteHeight, minuteHeight);
    }
  }
  let mY = minuteNumRows * minuteHeight;
  stroke(0);
  line(-width, mY, 2 * width, mY);

  for (let col = 1; col < minuteNumColumns; col += 1) {
    let mX = col * minuteHeight;
    line(mX, -height, mX, 2 * height);
  }

  pop();
}

function drawSeconds(nowHour, nowSecond) {
  let secAngle = map(nowSecond, 0, 59, 0, PI);
  let secX = random(SEC_DIAM / 2, width - SEC_DIAM / 2);
  let secY = random(SEC_DIAM / 2, height - SEC_DIAM / 2);
  let secRotate = random(-PI / 4, PI / 4);
  let numLines = nowHour / 2 + 1;

  push();
  translate(secX, secY);
  rotate(secRotate);

  strokeWeight(2);
  stroke(0);
  noFill();
  for (let l = 0; l < numLines; l++) {
    let diam = map(
      l,
      0,
      numLines,
      0.75 * SEC_DIAM + numLines * 6,
      0.75 * SEC_DIAM
    );
    arc(0, 0, diam, diam, 0, secAngle);
  }

  strokeWeight(4);
  let secondArcColor = random(["gold", "pink", "darkred"]);
  stroke(secondArcColor);
  let diam = 0.75 * SEC_DIAM;
  arc(0, 0, diam, diam, 0, secAngle);
  pop();
}

function draw() {
  let nowSecond = second();
  let nowMinute = minute();
  let nowHour = hour();
  let nowMonth = month();

  randomSeed(nowMinute);

  drawSeason(nowMonth);
  drawMinutes(nowMinute);
  drawHours(nowHour);
  drawSeconds(nowHour, nowSecond);
}
