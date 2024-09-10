var number = document.getElementById('num');
var numbers = [52];
var guesses = 0;
var allGuesses = 0;
var bestNums = 0;
var mean = 0;

var autoBtn = document.getElementById('auto');
var stopAutoclickBtn = document.getElementById('stopAutoclick');
var chooseBtn = document.getElementById('chooseBtn');
var resetBtn = document.getElementById('reset');
chooseBtn.onclick = chooseInner;

var guessesInfo = document.getElementById('guesses');
var allGuessesInfo = document.getElementById('allGuesses');
var bestNumsInfo = document.getElementById('bestNums');
var meanInfo = document.getElementById('mean');

var speedInput = document.getElementById('speed');
var speed;

autoBtn.onclick = autoClick;
var autoclickOn = false;

stopAutoclickBtn.onclick = () => {
    autoclickOn = false;
    try {
        clearInterval(timerTwo);
    } catch {}
}
resetBtn.onclick = () => {
    guesses = 0;
    allGuesses = 0;
    bestNums = 0;
    mean = 0;
    number.innerHTML = 0;
    guessesInfo.innerHTML = guesses;
    allGuessesInfo.innerHTML = allGuesses;
    bestNumsInfo.innerHTML = bestNums;
    meanInfo.innerHTML = mean;
    speedInput.value = '';
    console.clear();
}

function chooseInner() {
    number.innerHTML = Math.floor(Math.random() * 101);
    guesses++;
    allGuesses++;
    guessesInfo.innerHTML = guesses;
    allGuessesInfo.innerHTML = allGuesses;
    for (var i = 0; i < numbers.length; i++) {
        if (number.innerHTML == numbers[i]) {
            bestNums++;
            bestNumsInfo.innerHTML = bestNums;
            mean = Math.round(allGuesses / bestNums * 100) / 100;
            meanInfo.innerHTML = mean;
            console.log('ЧИСЛО ' + number.innerHTML + '  ПОПЫТКИ: ' + guesses + ' среднее ~ ' + mean);
            guesses = 0;
            guessesInfo.innerHTML = guesses;
        }
    }
}

function autoClick() {
    if (autoclickOn) {return;}
    speed = speedInput.value;
    if (speed == '' || speed <= 0 || speed > 1000) {
        speedInput.value = 100;
        speed = 100;
    }
    autoclickOn = true;
    var timer = setInterval(chooseInner, Math.floor(1000 / speed));
    window.timerTwo = timer;
}
