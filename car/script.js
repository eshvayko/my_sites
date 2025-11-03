let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.99;
canvas.height = window.innerHeight * 0.99;

let player = {
    x: 500,
    y: 500,
    vMax: 1,
    v: 0,
    vRotate: 0,
    vRotateMax: 0.7,
    angle: 0,
    width: 40,
    height: 60,
};

function toRad(deg) {return deg * Math.PI / 180}

// function drawPlayer() {
//     let x = player.x;
//     let y = player.y;
//     context.beginPath();
//     context.moveTo(x, y);
//     x += Math.sin(toRad(player.angle)) * player.height / 2;
//     y -= Math.cos(toRad(player.angle)) * player.height / 2;
//     context.moveTo(x, y);
//     x += Math.cos(toRad(player.angle)) * player.width / 2;
//     y += Math.sin(toRad(player.angle)) * player.width / 2;
//     context.lineTo(x, y);
//     x -= Math.sin(toRad(player.angle)) * player.height;
//     y += Math.cos(toRad(player.angle)) * player.height;
//     context.lineTo(x, y);
//     x -= Math.cos(toRad(player.angle)) * player.width;
//     y -= Math.sin(toRad(player.angle)) * player.width;
//     context.lineTo(x, y);
//     x += Math.sin(toRad(player.angle)) * player.height;
//     y -= Math.cos(toRad(player.angle)) * player.height;
//     context.lineTo(x, y);
//     x += Math.cos(toRad(player.angle)) * player.width / 2;
//     y += Math.sin(toRad(player.angle)) * player.width / 2;
//     context.lineTo(x, y);
//     context.fill();
// }

function drawPlayer() {
    context.save();
    context.translate(player.x, player.y);
    context.rotate(toRad(player.angle));
    context.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);
    context.restore();
}

function checkPlayerBeyondPage() {
    // let points = [
    //     {
    //         x: player.x + (-player.width / 2) * Math.cos(player.angle) - (-player.height / 2) * Math.sin(player.angle),
    //         y: player.y + (-player.width / 2) * Math.sin(player.angle) + (-player.height / 2) * Math.cos(player.angle),
    //     },
    //     {
    //         x: player.x + (player.width / 2) * Math.cos(player.angle) - (-player.height / 2) * Math.sin(player.angle),
    //         y: player.y + (player.width / 2) * Math.sin(player.angle) + (-player.height / 2) * Math.cos(player.angle),
    //     },
    //     {
    //         x: player.x + (-player.width / 2) * Math.cos(player.angle) - (player.height / 2) * Math.sin(player.angle),
    //         y: player.y + (-player.width / 2) * Math.sin(player.angle) + (player.height / 2) * Math.cos(player.angle),
    //     },
    //     {
    //         x: player.x + (player.width / 2) * Math.cos(player.angle) - (player.height / 2) * Math.sin(player.angle),
    //         y: player.y + (player.width / 2) * Math.sin(player.angle) + (player.height / 2) * Math.cos(player.angle),
    //     },
    // ];
    // if (points.some((p) => {return (p.x < 0 || p.x > canvas.width)})) {
    //     player.x -= player.v * Math.sin(toRad(player.angle));
    // }
    // if (points.some((p) => {return (p.y < 0 || p.y > canvas.height)})) {
    //     player.y += player.v * Math.cos(toRad(player.angle));
    // }
    let diag = Math.sqrt(player.width**2 + player.height**2)/2;
    player.x = Math.max(diag, Math.min(canvas.width - diag, player.x));
    player.y = Math.max(diag, Math.min(canvas.height - diag, player.y));
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'w') {
        player.v = player.vMax;
    }
    if (e.key === 's') {
        player.v = -player.vMax;
    }
    if (e.key === 'a') {
        player.vRotate = -player.vRotateMax;
    }
    if (e.key === 'd') {
        player.vRotate = player.vRotateMax;
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 's') player.v = 0;
    if (e.key === 'a' || e.key === 'd') player.vRotate = 0;
})

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.angle += player.vRotate;
    player.x += player.v * Math.sin(toRad(player.angle));
    player.y -= player.v * Math.cos(toRad(player.angle));
    checkPlayerBeyondPage();
    drawPlayer();
}

function play() {
    update();
    requestAnimationFrame(play);
}
play();
