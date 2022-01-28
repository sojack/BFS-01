function setup() {
  background(220);
  createCanvas(400, 400);
  // drawGrid()
  const myGrid = new Grid(unit,unit)
  myGrid.drawGrid();
  myGrid.setValues();
  myGrid.analyze(1,2)
}

function draw() {
}

var unit= 5
var unitSize = 400/unit

function mouseReleased(){
  fill(255,0,0,20)
  rect(floor(mouseX/unitSize)*unitSize, floor(mouseY/unitSize)*unitSize, unitSize, unitSize)
}