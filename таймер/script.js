const info = document.querySelector('.info');

const daysInfo = document.querySelector('#days');
const hoursInfo = document.querySelector('#hours');
const minutesInfo = document.querySelector('#minutes');
const secondsInfo = document.querySelector('#seconds');

const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');

var timerTick = false;
startBtn.onclick = start;

function start() {
    if (timerTick) {
        return;
    }
    info.innerHTML = 'Введите время и запустите таймер';
    var d = eval(daysInfo.value);
    var h = eval(hoursInfo.value);
    var m = eval(minutesInfo.value);
    var s = eval(secondsInfo.value);
    if (s >= 60) {
        s -= 60;
        m += 1;
    }
    if (m >= 60) {
        m -= 60;
        h += 1;
    }
    while (h >= 24) {
        h -= 24;
        d += 1;
    }
    daysInfo.value = d;
    hoursInfo.value = h;
    minutesInfo.value = m;
    secondsInfo.value = s;

    var time = eval(s * 1000 + m * 60000 + h * 3600000 + d * 86400000);
    showTime();
    var timerSec = setInterval(showTime, 1000);
    var timer = setTimeout(timeUp, time);
    stopBtn.onclick = stop;
    timerTick = true;

    function timeUp() {
        info.innerHTML = 'Время вышло!';
        clearInterval(timerSec);
        timerTick = false;
    }

    function showTime() {
        d = daysInfo.value;
        h = hoursInfo.value;
        m = minutesInfo.value;
        s = secondsInfo.value;
        if (d == 0 && h == 0 & m == 0 & s == 0) {
            return;
        }
        s -= 1;
        if (s < 0) {
            if (!(m == 0)) {
                s = 59;
                m -= 1;
            } else if (m == 0 && h !== 0) {
                s = 59;
                m = 59;
                h -= 1;
            }
        }
        if ((m < 0) && !(h == 0)) {
            m = 59;
            h -= 1;
        }
        if ((h < 0) && !(d == 0)) {
            h = 23;
            d -= 1;
        }
        daysInfo.value = d;
        hoursInfo.value = h;
        minutesInfo.value = m;
        secondsInfo.value = s;
    }

    function stop() {
        clearTimeout(timer);
        clearInterval(timerSec);
        timerTick = false;
    }
}
