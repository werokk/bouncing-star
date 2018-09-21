'use strict';

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
var newx;
var newy;
// Event Listeners
addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

});
function printMousePos(event) {
    newx = event.clientX
    newy = event.clientY;
    init();



}

document.addEventListener("click", printMousePos);
// Objects
function Star(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = {
    x: 10,
    y: _utils2.default.randomIntFromRange(-40, -5)
  };
  this.friction = 0.8;
  this.gravity = 1;
}

Star.prototype.draw = function () {
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = this.color;
  c.shadowColor = '#E3EAEF'
  c.shadowBlur = 20
  c.fill();
  c.closePath();
};

Star.prototype.update = function () {
  this.draw();
  //when balls hits end of the screen
  if (this.y + this.radius + this.velocity.y > canvas.height) {
    this.velocity.y = -this.velocity.y * this.friction;
    if(this.radius > 0){
      this.radius -= 1;
    }
  } else {
    this.velocity.y += this.gravity;
  }
  //if hits side of the screen
  if (this.x + this.radius + this.velocity.x > canvas.width || this.x - this.radius <= 0) {
    this.velocity.x = - this.velocity.x;
  }

  this.y += this.velocity.y;
  this.x += this.velocity.x;
};
function createMountainRange(mountainAmount, height, color){
  for (var i = 0; i < mountainAmount; i++) {
    var mountainWidth = canvas.width / mountainAmount
    c.beginPath()
    c.moveTo(i * mountainWidth, canvas.height)
    c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height)
    c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height)
    c.lineTo(i * mountainWidth - 325, canvas.height)
    c.fillStyle = color
    c.fill()
    c.closePath()
  }

}

const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height)
backgroundGradient.addColorStop(0, '#171e26')
backgroundGradient.addColorStop(1, '#3f586b')



// Implementation
var stars ;
var backgroundStars;
function init() {
    stars = new Star(newx, newy, 50, '#E3EAEF');
}
function makeStars(){
  backgroundStars = []
  for (let i=0; i<150; i++){
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 3
    backgroundStars.push(new Star(x, y, radius, 'white'))
  }
}
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = backgroundGradient
  c.fillRect(0, 0, canvas.width, canvas.height);
backgroundStars.forEach(backgroundStar =>{
  backgroundStar.draw()
})
stars.update();
}
makeStars();
animate();
