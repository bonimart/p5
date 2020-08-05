const W = 700;
const H = 400;
let dt = 0.05;
let g = 9.81;
let θ = 45;
let m = 1;
let v = 60;
let bullet = {
  vx : v * Math.cos(θ * Math.PI / 180),
  vy : v * Math.sin(θ * Math.PI / 180),
  x : 0,
  y : H
}
let timer = 0;
let positions = [];
function setup() {
  createCanvas(W, H);
  textSize(20);
  
  θSlider = createSlider(1, 90, θ);
  θSlider.position(10, 40);
  θSlider.style('width', '140px');
  
  vSlider = createSlider(1, 80, v);
  vSlider.position(200, 40);
  vSlider.style('width', '140px');
  
  gSlider = createSlider(1, 20, g, 0.1);
  gSlider.position(390, 40);
  gSlider.style('width', '140px');
  

  reset = createButton('Reset');
  reset.position(580, 40);
  reset.mousePressed(() =>{
    θSlider.value(45);
    vSlider.value(60);
    gSlider.value(9.8);
  });

}

function draw() {
  background(10);
  
  fill(255)
  noStroke();
  text("Angle in degrees:", 10, 30);
  text(θSlider.value(), 70, 80);
  θ = θSlider.value();
  
  text('Initial velocity:', 210, 30);
  text(vSlider.value(), 260, 80);
  v = vSlider.value();
  
  text('Gravity:', 420, 30);
  text(gSlider.value(), 450, 80);
  g = gSlider.value();
  
  for(let i = 0; i < positions.length; i++){
    fill(245*i/positions.length + 10);
    circle(positions[i][0], positions[i][1], 5)
  }
  fill(255);
  circle(bullet.x, bullet.y, 10);
  
  timer++;
  if(timer == 10){
    positions.push([bullet.x, bullet.y])
    if(positions.length >= 20){
      positions.shift();
    }
    timer -= 10;
  }
  
  bullet.x += bullet.vx*dt;
  bullet.y -= bullet.vy*dt;
  bullet.vy -= g*dt;
  if(bullet.x >= W || H > bullet.y <= 0){
    bullet.x = 0;
    bullet.y = H;
    bullet.vy = v * Math.sin(θ * Math.PI / 180);
    bullet.vx = v * Math.cos(θ * Math.PI / 180);
  }
  
}