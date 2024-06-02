var number = document.getElementById('num');
var autoBtn = document.getElementById('auto');
var chooseBtn = document.getElementById('chooseBtn');
chooseBtn.onclick = chooseInner;
var guessesInfo = document.getElementById('guesses');
var allGuessesInfo = document.getElementById('allGuesses');
var bestNumsInfo = document.getElementById('bestNums');
var meanInfo = document.getElementById('mean');
autoBtn.onclick = autoClick;
var guesses = 0;
var allGuesses = 0;
var bestNums = 0;
var mean = 0;

function chooseInner() {
    number.innerHTML = Math.floor(Math.random() * 101);
    guesses++;
    allGuesses++;
    guessesInfo.innerHTML = guesses;
    allGuessesInfo.innerHTML = allGuesses;
    if (number.innerHTML == 1 || number.innerHTML == 100 || number.innerHTML == 52) {
        bestNums++;
        bestNumsInfo.innerHTML = bestNums;
        mean = Math.round(allGuesses / bestNums * 100) / 100;
        meanInfo.innerHTML = mean;
        console.log('ЧИСЛО ' + number.innerHTML + '  ПОПЫТКИ: ' + guesses + ' среднее ~ ' + mean);
        guesses = 0;
        guessesInfo.innerHTML = guesses;
    }
}

function autoClick() {
    var timer = setInterval(chooseInner, 30);
}