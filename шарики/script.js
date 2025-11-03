let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext('2d');

let fps = 144;

context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);

let circles = [];

class Ball {
    constructor(x, y, radius, vX, vY, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vX = vX;
        this.vY = vY;
        this.color = color;
    }

    draw() {
        context.beginPath();
        context.fillStyle = this.color
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
    }
}

function update() {
    for (let i = 0; i < circles.length; i++) {
        if (circles[i].x + circles[i].vX - circles[i].radius <= 0 || circles[i].x + circles[i].vX + circles[i].radius >= canvas.width) {
            circles[i].vX = -circles[i].vX;
        }
        if (circles[i].y + circles[i].vY - circles[i].radius <= 0 || circles[i].y + circles[i].vY + circles[i].radius >= canvas.height) {
            circles[i].vY = -circles[i].vY;
        }

        circles[i].x += circles[i].vX;
        circles[i].y += circles[i].vY;

        context.clearRect(0, 0, canvas.width, canvas.height);
        draw();
    }
}

function draw() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < circles.length; i++) {
        circles[i].draw();
    }
}

function generateColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

function createBall() {
    let radius = Math.random() * 50+10;
    let x = Math.random() * (canvas.width - 2*radius) + radius; // от radius до width/height-radius
    let y = Math.random() * (canvas.height - 2*radius) + radius;
    let circle = new Ball(x, y, radius, Math.random() * 2+1, Math.random() * 2+1, generateColor());
    circles.push(circle);
}

document.onclick = createBall;

document.onkeydown = (e) => {
    if (e.keyCode === 32) {
        for (let i = 0; i < 10; i++){
            createBall();
        }
    }
}

setInterval(update, 1000/fps);