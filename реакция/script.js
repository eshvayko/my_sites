const mainBtn = document.querySelector('.main-btn');

let i = 0;
let score = 0;

let record = 888; // 7.481
let time1;
let time2;

function play() {
    level = document.querySelector('#levelInfo').innerHTML
    document.querySelector('.container').style.display = 'none';
    mainBtn.setAttribute('style', 'display: block; z-index: 999');
    time = setTime(level)
    run(time, false);
}

function playTimeGame() {
    document.querySelector('.container').style.display = 'none';
    mainBtn.setAttribute('style', 'display: block; z-index: 999');
    time1 = new Date().getTime();
    runTimeGame()
}

function setTime(level) {
    if (level === '1') {
        return 2000
    } else if (level === '2') {
        return 1500
    } else if (level === '3') {
        return 1000
    } else if (level === '4') {
        return 750
    } else if (level === '5') {
        return 500
    }
}

function changePosition() {
    width = window.innerWidth;
    height = window.innerHeight;
    x = Math.floor(Math.random() * (width - 55));
    y = Math.floor(Math.random() * (height - 20));
    mainBtn.style = `position: absolute; top: ${y}px; left: ${x}px;`;
}

function run(time, a= true) {
    if (a) {
        effect('red')
    }
    changePosition();
    i++;
    if (i <= 10) {
        t = setTimeout(run, time, time);
        mainBtn.onclick = () => {clearTimeout(t); score++; run(time, false); effect('green')};
    } else {
        document.querySelector('.container').style.display = 'flex';
        mainBtn.setAttribute('style', 'display: none;');
        changeInfoBlock([2], 3);
        document.querySelector('#levelInfo1').innerHTML = document.querySelector('#levelInfo').innerHTML;
        document.querySelector('#scoreInfo').innerHTML = score;
        i = 0;
        score = 0;
    }
}

function runTimeGame() {
    changePosition();
    i++;
    if (i <= 10) {
        mainBtn.onclick = () => {runTimeGame()};
    } else {
        time2 = new Date().getTime();
        let time = (time2 - time1) / 1000;
        if (time < record) {
            record = time;
            document.querySelector('.record1').innerHTML = ` побит! - ${time} сек`;
            effect('record')
        } else {
            document.querySelector('.record1').innerHTML = `- ${record} сек`;
        }
        changeInfoBlock(['TimeGame'], 'TimeGame2')
        document.querySelector('.container').style.display = 'flex';
        mainBtn.setAttribute('style', 'display: none;');
        document.querySelector('#time').innerHTML = `${time} сек`;
    }
}

function changeInfoBlock(num, num1) {
    for (let i = 0; i < num.length; i++) {
        document.querySelector(`.info${num[i]}`).style.display = 'none';
    }
    document.querySelector(`.info${num1}`).style.display = 'block';
    if (num1 === 'TimeGame') {
        document.querySelector('.record').innerHTML = `${record} сек`
    }
    if (num1 === 0) {
        document.querySelector('#back').style.display = 'none';
    } else {
        document.querySelector('#back').style.display = 'block';
    }
}

function setLevel(level) {
    changeInfoBlock([1], 2)
    document.querySelector('#levelInfo').innerHTML = level;
}

function effect(color) {
    document.body.style.animation = 'none';
    document.body.offsetHeight; // это типа запрос перепрошивки сайта (наверное)
    document.body.style.animation = null; // эти 3 строки удаляют animation у body чтобы можно было повторно ее использовать
    if (color === 'green') {
        document.body.style.animation = 'green-background linear 0.5s';
    } else if (color === 'red') {
        document.body.style.animation = 'red-background linear 0.5s';
    } else if (color === 'record') {
        document.body.style = 'animation: record linear 2s; animation-iteration-count: infinite;';
    }
}